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
    Button
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as db from '../components/db';
import cardStyle from './../styles/eventCard';
import * as util from './../util.js';
import strings from './../components/localizedStrings';
import Filter from '../components/filter'

var maxEventDescriptionLength = 75;
var monthNames = ["Janv", "Fév", "Mars", "Avril", "Mai", "Juin", "Juill", "Août", "Sept", "Oct", "Nov", "Déc"];

function ThreePoints(text) {
    if (text.length > 25) {
        text = text.substr(0, 25) + "...";
    }
    return text;
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 = !row2,
            }),
            loaded: false,
            refreshing: false,
            hasEvents: false,
            areFiltersVisible: false
        };

        this.onPressEvent = this.onPressEvent.bind(this);
    }

    componentDidMount() {
        this._onRefresh();
    }

    async _onRefresh() {
        this.setState({
            loaded: false,
            refreshing: true
        });

        // Load all events to be showed
        let events = await db.getEvents();
        if (events.length) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(events),
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

    onPressEvent(event) {
        this.props.navigator.push({
            title: 'Event',
            passProps: {
                event
            }
        });
    }

    render() {
        var email = this.props.email;

        // Show loading indicator until all events are loaded
        // Then show all events in chronological order
        let eventList;
        let search;
        let filters = this.state.areFiltersVisible ? this.renderFiltersZone() : null;
        if (this.state.loaded) {
            eventList = this.state.hasEvents ? this.renderEvents() : this.renderNoEventsToShow();
            if(this.state.hasEvents){
                search = this.renderSearchZone();
            }
        } else {
            this.renderLoadingIndicator();
        }

        // For now only the admin can create events through the admin page
        let allowEventCreation = false;
        let createEventButton = allowEventCreation ? this.renderCreateEventButton() : null;

        return (
            <View style={{flex:1, marginTop:(Platform.OS === 'ios') ? 20 : 0}}>
                <View style={styles.topbar}>
                    <View style={styles.menu0}>
                        <Image source={require("../images/Menu.png")} style={styles.icon}/>
                    </View>
                    <Text style={styles.viseocompanion}>VISEO COMPANION</Text>
                </View>
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

    /*
     Layout showing an event card
     The event card is a small card which shows the main information for a given event.
     */
    renderEventCard(event) {
        // Prepare the event description. If it's too long to be showed in the card,
        // truncate it and append dots to let the user know there's more to read.
        let eventDescription = event.description;
        if (eventDescription.length > maxEventDescriptionLength) {
            eventDescription = util.truncate(eventDescription, maxEventDescriptionLength);
            eventDescription += '...';
        }

        return (
            <View style={cardStyle.card}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 10,
                    margin:2,
                  }}>
                        {/*Participation dot*/}
                        <TouchableOpacity style={cardStyle.participationDot}/>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {/* First ROW: event name, date and time */}
                    <View
                        style={{
                            flex:1,
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        }}
                    >
                        {/* Display event NAME in bold in top left corner*/}
                        <Text style={cardStyle.name}>
                            {event.name}
                        </Text>
                        {/* Display event DATE in top right corner */}
                        {/* Display event LOCATION in top right corner, next to the date */}
                        <Text style={cardStyle.info}>
                            {event.getTime()} at {event.location.toUpperCase()}
                        </Text>
                    </View>

                    {/* Second ROW: event description*/}
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Text style={cardStyle.description}>
                            {eventDescription}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderEventCardWithOldStyle(event) {
        // Prepare the event description. If it's too long to be showed in the card,
        // truncate it and append dots to let the user know there's more to read.
        let eventDescription = event.description;
        if (eventDescription.length > maxEventDescriptionLength) {
            eventDescription = util.truncate(eventDescription, maxEventDescriptionLength);
            eventDescription += '...';
        }

        return (
            <View>
                <TouchableOpacity
                    onPress={ () => {
                        this.onPressEvent(event);
                    }}
                >
                    <View style={styles.rectangle}>
                        <View style={styles.leftRectangle}>
                            <Text style={styles.date}> {new Date(event.date).getDate()}</Text>
                            <Text style={styles.date}> {monthNames[new Date(event.date).getMonth()]}</Text>
                            <Text
                                style={styles.date}> {event.getTime()}</Text>
                        </View>
                        <View style={styles.rightRectangle}>
                            <Text style={styles.name}> {ThreePoints(event.name) } </Text>
                            <Text style={styles.location}> {event.location} </Text>
                            <Text style={styles.location}> {ThreePoints(event.description)} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderEvents() {
        return (
            <ListView
                contentContainerStyle={{
                }}
                navigator={this.props.navigator}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard.bind(this)}
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

    renderSearchZone(){
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    onFocus={() => this.setState({
                        areFiltersVisible: true,
                    })}
                    placeholder={strings.filterZone}
                    ref="filterZone"
                    autoCorrect={false}
                    selectTextOnFocus={true}
                    underlineColorAndroid={"white"}
                    returnKeyType="next"
                    autoCapitalize="none"
                />
            </View>
        )
    }

    renderFiltersZone(){
        return (
            <View>
                <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems:'flex-end'}}>
                        <TouchableOpacity
                            style={styles.redBox}
                            onPress={() => this.setState({
                                areFiltersVisible: false,
                            })}>
                            <Text style={styles.crossButtonText}>
                                X
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'column'}}>
                    <View style={{alignItems: 'stretch', flexDirection: 'row'}}>
                        <Filter color='red'/>
                        <Filter color='orange'/>
                        <Filter color='lightgreen'/>
                        <Filter color='royalblue'/>
                    </View>
                </View>
            </View>
        )
    }
}


var {
    height: deviceHeight,
    width : deviceWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({

    screen: {
        height: (Platform.OS === 'ios') ? 200 : 100,
    },

    topbar: {
        height: (1 / 13) * deviceHeight,
        backgroundColor: 'white',
        // justifyContent:'space-between',
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
        color: 'blue',
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
        /*marginTop:5,*/
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

    redBox: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        borderRadius: 1,
        marginRight: 10,
        justifyContent:'center',
    },

    crossButtonText: {
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    }
});