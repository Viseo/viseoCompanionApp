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
import ListViewHeader from './../components/events/header';
import Header from './../components/header';
import AppText from '../components/appText';
import EventListView from './../components/events/eventListView';

export default class Home extends Component {

    static defaultProps = {
        user: {id: 1}
    };

    constructor(props) {
        super(props);
        this.state = {
            allEvents: [],
            showedEvents: [],
            loaded: false,
            refreshing: false,
            isSearching: false,
        };
    }

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = async() => {
        this.setState({
            refreshing: true
        });
        let allEvents = await db.getEvents();
        let eventsWhereLoggedUserIsGoing = await db.getEventsByRegisteredUser(this.props.user.id);
        allEvents.forEach(event => {
            let participating = false;
            for (let key in eventsWhereLoggedUserIsGoing) {
                if (eventsWhereLoggedUserIsGoing[key].id === event.id) {
                    participating = true;
                    break;
                }
            }
            event.participating = participating;
        });
        this.setState({
            allEvents,
            filteredOnParticipation : allEvents
        });
        this.updateEventList(this.state.allEvents);
    };

    onParticipationChange = async(changedEvent) => {
        let showedEvents = this.state.showedEvents.map(event => {
            return event.id === changedEvent.id ?
                {...event, participating: !event.participating} :
                event;
        });
        this.setState({
            showedEvents
        });
        await changedEvent.participating ?
            db.removeEventParticipant(changedEvent.id, this.props.user.id) :
            db.addEventParticipant(changedEvent.id, this.props.user.id);
    };

    onFilter = filteredEvents => {
        filteredEvents = filteredEvents.length > 0 ? filteredEvents : this.state.allEvents;
        this.updateEventList(filteredEvents);
    };

    onPressEventCard = (event) => {
        this.props.navigator.push({
            title: 'EventDetails',
            passProps: {
                event,
                onParticipationChange: async() => {
                    await this.onParticipationChange(event)
                }
            }
        });
    }

    onSearch = (eventSource, searchString, matchingEvents) => {
        let eventsToShow = matchingEvents.length > 0 ? matchingEvents : eventSource;
        this.updateEventList(eventsToShow);
    };

    render() {
        // let eventList;
        // if (this.state.loaded) {
        //     let hasEvents = this.allEvents && this.allEvents.length;
        //     eventList = hasEvents ? this.renderEvents() : this.renderNoEventsToShow();
        // } else {
        //     this.renderLoadingIndicator();
        // }
        //

        // For now only the admin can create allEvents through the admin page
        let allowEventCreation = false;
        let createEventButton = allowEventCreation ? this.renderCreateEventButton() : null;


        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <Header/>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.loadEvents}
                        />
                    }
                    scrollEventThrottle={200}
                    contentContainerStyle={{
                        backgroundColor:'lightgrey'
                    }}
                >
                    {this.renderEventView()}
                </ScrollView>
                {createEventButton}
            </View>
        );
    }

    renderEventView() {
        let searchBar = {
            dataSource: this.state.allEvents,
            onSearch: this.onSearch
        }
        return (
            <EventListView
                header={
                    <ListViewHeader
                        dataSource={this.state.allEvents}
                        onFilter={this.onFilter}
                        searchBar={searchBar}
                   />
                }
                events={this.state.showedEvents}
                onPressEventCard={this.onPressEventCard}
                onParticipationChange={this.onParticipationChange}
            />
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

    renderNoEventsToShow() {
        return (
            <AppText style={styles.noEvent}>
                Whoops... There's nothing to show.{"\n\n"}
                Come back later!
            </AppText>
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

    updateEventList = events => {
        let showedEvents = events.slice();
        this.setState({
            showedEvents,
            loaded: true,
            refreshing: false
        });
    };
}

const {
    height: deviceHeight,
    width: deviceWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    topbar: {
        height: (1 / 13) * deviceHeight,
        backgroundColor: '#103a71',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    burgerMenu: {
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
    },
});