/**
 * Created by LMA3606 on 13/02/2017.
 */
import React, {Component} from "react";
import {
    ActivityIndicator,
    Animated,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Navigator,
    NavMenu,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    RefreshControl,
    Platform,
    TextInput,
    Button,
    Keyboard
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import db from '../util/db';
import strings from './../util/localizedStrings';
import EventCard from './../components/eventCard';
import HeaderListView from './../components/eventView/header';
import Header from './../components/header';

export default class Home extends Component {

    static defaultProps = {
        user: {id: 1}
    }

    constructor(props) {
        super(props);
        this.allEvents = {};
        this.showedEvents = {};
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: ds,
            loaded: false,
            refreshing: false,
            isSearching: false,
            isFiltering: false,
            participationFilterSelected: false
        };
    }

    componentDidMount() {
        this.reloadEventList();
    }

    reloadEventList = async() => {
        this.setState({
            refreshing: true
        });
        this.allEvents = await db.getEvents();
        for (let key in this.allEvents) {
            let eventWithParticipationInfo = this.allEvents[key];
            let user = await db.getEventParticipant(eventWithParticipationInfo.id, this.props.user.id);
            eventWithParticipationInfo.participating = !!user;
        }
        this.updateEventList(this.allEvents);
    }

    updateEventList = events => {
        this.showedEvents = events.slice();
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.showedEvents),
            loaded: true,
            refreshing: false
        });
    }

    onParticipationChange = async(changedEvent) => {
        this.showedEvents = this.showedEvents.map(event => {
            return event.id === changedEvent.id ?
                {...event, participating: !changedEvent.participating} :
                event;
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.showedEvents),
        });
        await changedEvent.participating ?
            db.removeEventParticipant(changedEvent.id, this.props.user.id) :
            db.addEventParticipant(changedEvent.id, this.props.user.id);
    }

    onPressEventCard = (event) => {
        this.props.navigator.push({
            title: 'EventDetails',
            passProps: {
                event
            }
        });
    }

    onSearch = (eventSource, matchingEvents) => {
        let eventsToShow = matchingEvents.length > 0 ? matchingEvents : eventSource;
        this.updateEventList(eventsToShow);
    }

    onParticipationFilterChanged = async() => {
        let selectFilter = !this.state.participationFilterSelected;
        this.setState({
            isFiltering: true,
            participationFilterSelected: selectFilter
        });
        Keyboard.dismiss();
        selectFilter ?
            this.showEventsWhereCurrentUserIsGoing() :
            this.reloadEventList();
    }

    showEventsWhereCurrentUserIsGoing = async() => {
        let events = await db.getEventsWithParticipant(this.props.user.id);
        for (let key in events) {
            events[key].participating = true;
        }
        this.updateEventList(events);
    }

    render() {
        let eventList;
        if (this.state.loaded) {
            let hasEvents = this.allEvents && this.allEvents.length;
            eventList = hasEvents ? this.renderEvents() : this.renderNoEventsToShow();
        } else {
            this.renderLoadingIndicator();
        }

        // For now only the admin can create allEvents through the admin page
        let allowEventCreation = false;
        let createEventButton = allowEventCreation ? this.renderCreateEventButton() : null;

        return (
            <View style={{flex:1, marginTop:(Platform.OS === 'ios') ? 20 : 0}}>
                <Header/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.reloadEventList}
                        />
                    }
                    scrollEventThrottle={200}
                    contentContainerStyle={{
                        backgroundColor:'lightgrey'
                    }}
                >
                    {eventList}
                </ScrollView>
                {createEventButton}
            </View>
        );
    }

    renderCreateEventButton() {
        return (
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New event" onPress={this.props.onAddEventClicked}>
                    <Icon name="md-create" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        );
    }

    renderEventCard = event => {
        return (
            <EventCard
                title={event.name}
                description={event.description}
                location={event.location}
                date={event.getTime()}
                participating={event.participating}
                onParticipationChange={async () => { await this.onParticipationChange(event)}}
                onPress={() => {this.onPressEventCard(event)}}
            />
        );
    }

    renderEvents() {
        const filters = {
            participation: this.onParticipationFilterChanged,
        };
        let searchBar = {
            dataSource: this.allEvents,
            onSearch: this.onSearch
        }
        return (
            <ListView
                navigator={this.props.navigator}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
                renderHeader={() =>
                    <HeaderListView
                        filters={filters}
                        searchBar={searchBar}
                   />
                }
            />
        );
    }

    renderNoEventsToShow() {
        return (
            <Text style={styles.noEvent}>
                Whoops... There's nothing to show.{"\n\n"}
                Come back later!
            </Text>
        );
    }

    renderLoadingIndicator() {
        return (
            <ActivityIndicator
                animating={this.state.animating}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,height: 80}}
                size="large"
            />
        );
    }
}

var {
    height: deviceHeight,
    width: deviceWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        height: (Platform.OS === 'ios') ? 200 : 100,
    },
    topbar: {
        height: (1 / 13) * deviceHeight,
        backgroundColor: '#103a71',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    menu: {
        width: (1 / 14) * deviceHeight,
        height: (1 / 14) * deviceHeight,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'flex-start',
        margin: 5,
    },
    menu0: {
        width: 85,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
        marginTop: 5,
    },

    viseocompanion: {
        fontSize: 20,
        color: 'white',
    },

    loadingText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: 'gray',
    },

    title: {
        textAlign: 'left',
        marginLeft: 3,
        fontSize: 18,
        marginBottom: 2,
        backgroundColor: 'white',
    },

    container: {
        borderRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },

    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: deviceHeight
    },

    rectangle: {
        width: 0.99 * deviceWidth,
        height: 100,
        backgroundColor: 'white',
        marginBottom: 4,
        flexDirection: 'row',
    },

    leftRectangle: {
        flex: 3,
    },

    rightRectangle: {
        flex: 5,
    },

    lines: {
        fontSize: 30,
        color: 'black',
    },

    toolbar: {
        backgroundColor: 'white',
    },

    date: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },

    hour: {
        textAlign: 'left',
        color: 'black',
        fontSize: 20,
    },

    name: {
        textAlign: 'left',
        color: 'black',
        marginBottom: 10,
    },

    location: {
        textAlign: 'left',
        color: 'black',
        marginBottom: 10,
    },

    description: {
        textAlign: 'left',
        color: 'black',
    },

    actionButtonIcon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },

    noEvent: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        color: '#707070',
    },

    filterIcon: {
        marginTop: 35,
        marginLeft: 20,
        marginRight: 20
    },

    input: {
        width: Dimensions.get('window').width,
        textAlign: 'center',
        // marginTop: 15,
        // marginBottom: 15
    },
});