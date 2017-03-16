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
import * as util from './../util/util';
import strings from './../util/localizedStrings';
import Filter from './../components/eventView/filter';
import EventCard from './../components/eventCard';
import Swipeout from 'react-native-swipe-out';
import {Header as HeaderListView} from './../components/eventView/header';
import Header from './../components/header';

export default class Home extends Component {

    static defaultProps = {
        user: {id: 1}
    }

    constructor(props) {
        super(props);
        var events = {};
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: ds,
            loaded: false,
            refreshing: false,
            hasEvents: false,
            isSearching: false,
            isFiltering: false,
            participationFilterSelected: false
        };
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh = async() => {
        this.setState({
            loaded: false,
            refreshing: true
        });

        // Load all events to be showed
        let events = await db.getEvents();
        for (let key in events) {
            let event = events[key];
            let user = await db.getEventParticipant(event.id, this.props.user.id);
            event.participating = !!user;
        }
        this.events = events;
        if (events.length) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.events),
                loaded: true,
                refreshing: false,
                hasEvents: true
            });
        } else {
            this.setState({
                loaded: true,
                hasEvents: false,
                refreshing: false,
            });
        }

    }

    updateEventList = events => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(events)
        });
    }

    render() {

        // Show loading indicator until all events are loaded
        // Then show all events in chronological order
        let eventList;
        let search = this.state.hasEvents ? this.renderSearchZone() : null;
        let filters = this.state.isSearching || this.state.isFiltering ? this.renderFiltersZone() : null;
        if (this.state.loaded) {
            eventList = this.state.hasEvents ? this.renderEvents() : this.renderNoEventsToShow();
        } else {
            this.renderLoadingIndicator();
        }

        // For now only the admin can create events through the admin page
        let allowEventCreation = false;
        let createEventButton = allowEventCreation ? this.renderCreateEventButton() : null;

        return (
            <View style={{flex:1, marginTop:(Platform.OS === 'ios') ? 20 : 0}}>
                <Header/>
                {search}
                {filters}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
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
                onPress={() => {this.onPressEvent(event)}}
            />
        );
    }

    onPressEvent = (event) => {
        this.props.navigator.push({
            title: 'EventDetails',
            passProps: {
                event
            }
        });
    }

    onParticipationChange = async(changedEvent) => {
        this.events = this.events.map(event => {
            return event.id === changedEvent.id ?
                {...event, participating: !changedEvent.participating} :
                event;
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.events),
        });
        await changedEvent.participating ?
            db.removeEventParticipant(changedEvent.id, this.props.user.id) :
            db.addEventParticipant(changedEvent.id, this.props.user.id);
    }

    renderEvents() {
        const filters = {
            participation: this.onParticipationFilterChanged,
        };


    //     renderHeader={() =>
    //     <HeaderListView
    //         filters={filters}
    //         searchBar={{
    //                         dataSource: this.events,
    //                         onInputChanged: () => {console.warn('searchBar onInputChanged')}
    //                     }}
    //     />
    // }

        return (
            <ListView
                contentContainerStyle={{
                }}
                navigator={this.props.navigator}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
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

    renderSearchZone() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={strings.filterZone}
                    ref="filterZone"
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    underlineColorAndroid={"grey"}
                    returnKeyType="search"
                    onChangeText={(input) => this.updateListViewOnResearch(input)}
                    onFocus={ () => {
                        this.setState({
                            isSearching: true,
                        });
                    }}
                    onEndEditing={ () => {
                        this.setState({
                            isSearching: false,
                        });
                    }}
                />
            </View>
        );
    }

    updateListViewOnResearch(input) {
        let dataSource = this.state.dataSource.cloneWithRows(this.events);
        if (input) {
            let researchedEvents = this.searchEvents(input);
            dataSource = this.state.dataSource.cloneWithRows(researchedEvents);
        }
        this.setState({dataSource: dataSource});
    }

    searchEvents(input) {
        let researchedEvents = [];
        for (var i = 0; i < this.events.length; i++) {
            let eventInResearch = false;
            eventInResearch = this.existsInputInChain(this.events[i].name, input)
                || this.existsInputInChain(this.events[i].description, input);
            if (eventInResearch) {
                researchedEvents.push(this.events[i]);
            }
        }
        return researchedEvents;
    }

    existsInputInChain(chain, input) {
        return chain && input && chain.toString().toLowerCase().indexOf(input.toString().toLowerCase()) > -1;
    }

    showEventsWhereCurrentUserIsGoing = async() => {
        let events = await db.getEventsWithParticipant(this.props.user.id);
        for (let key in events) {
            events[key].participating = true;
        }
        this.updateEventList(events);
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
            this._onRefresh();
    }

    /////////////////// BELOW ARE DEPRECATED FUNCTIONS //////////////////////



    /////////////////// EVENT FILTERS
    renderFiltersZone() {
        return (
            <View>
                <View
                    style={{flexDirection: 'row', justifyContent:'space-between',alignItems: 'center', marginRight:10, marginLeft:10}}>
                    <Filter selectedColor='red' onFilter={this.showEventsWithHighImportance}/>
                    <Filter selectedColor='orange' onFilter={this.showEventsWithMediumImportance}/>
                    <Filter selectedColor='lightgreen' onFilter={this.showEventsWithLowImportance}/>
                    <Filter
                        selected={false}
                        selectedColor='royalblue'
                        unselectedColor='lightblue'
                        onFilter={this.onParticipationFilterChanged}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isFiltering : false
                            });
                            Keyboard.dismiss();
                        }}
                        style={{marginLeft: -50}}
                    >
                        <Image
                            source={require("../images/upArrow.png")}
                            style={{resizeMode: 'contain', height:15}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    showEventsWithHighImportance = () => {
        this.setState({
            isFiltering: true
        });
        Keyboard.dismiss();
    }

    showEventsWithMediumImportance = () => {
        this.setState({
            isFiltering: true
        });
        Keyboard.dismiss();
    }

    showEventsWithLowImportance = () => {
        this.setState({
            isFiltering: true
        });
        Keyboard.dismiss();
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