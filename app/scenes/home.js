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
import db from '../util/db';
import cardStyle from './../styles/eventCard';
import * as util from './../util/util';
import strings from './../util/localizedStrings';
import Filter from './../components/filter';
import Swipeout from 'react-native-swipe-out';



var maxEventDescriptionLength = 75;
var monthNames = ["Janv", "Fév", "Mars", "Avril", "Mai", "Juin", "Juill", "Août", "Sept", "Oct", "Nov", "Déc"];

function troncateText(text, nbOfCaractere) {
    if (text.length > nbOfCaractere) {
        text = text.substr(0, nbOfCaractere) + "...";
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

        let swipeOption = event.isParticipating ?
            [{  text: strings.ImGoing,
                onPress: async () => await db.addEventParticipant(event.id, this.state.userid),
                backgroundColor: '#4fba8a',
                color: '#14605a',
                underlayColor: "#006fff",
            }] :
            [{  text: strings.ImNotGoing,
                onPress: async () => await db.removeEventParticipant(event.id, this.state.userid),
                backgroundColor: '#ba7a7c',
                color: '#601d20',
                underlayColor: "#006fff",
            }];
        return (
            <View>
                <Swipeout
                    style={{ backgroundColor: '#c1c1c1' }}
                    disabled= {this.state.areFiltersVisible}
                    right={swipeOption}
                >
                    <TouchableOpacity
                        onPress={ () => {
                        this.onPressEvent(event);
                    }}
                        style={cardStyle.card}
                    >
                        <View style={{
                            flex:1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 10,
                            marginLeft:2,
                            marginRight:5,
                        }}>
                            {/*Participation dot*/}
                            <View style={cardStyle.participationDot}/>
                            {/*Event type*/}
                            <View style={cardStyle.eventType}/>
                        </View>

                        <View style={{
                        flex: 50,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding:5,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#999999'
                      }}>
                            {/* First ROW: event name, date and time */}
                            <View
                                style={{
                                flex:1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            >
                                {/* Display event NAME in bold in top left corner*/}
                                <Text style={cardStyle.name}>
                                    {troncateText(event.name, 32) }
                                </Text>
                                {/* Display event DATE in top right corner */}
                                {/* Display event LOCATION in top right corner, next to the date */}
                                <Text style={cardStyle.location}>
                                    {event.getTime()} {strings.at} {event.location.toUpperCase()}
                                </Text>
                            </View>

                            {/* Second ROW: event description*/}
                            <View
                                style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}
                            >
                                <Text style={cardStyle.description}>
                                    {troncateText(event.description, 120)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>

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
                            <Text style={styles.name}> {troncateText(event.name, 75) } </Text>
                            <Text style={styles.location}> {event.location} </Text>
                            <Text style={styles.location}> {troncateText(event.description, 75)} </Text>
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
        let filterIcon = this.renderFilterIcon();
        return (
            <View style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                <View style={{alignItems: 'stretch', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                        areFiltersVisible: !this.state.areFiltersVisible,
                        });
                        this.renderFilterIcon();
                        }
                    }
                    style={styles.filterIcon}>
                        {filterIcon}
                    </TouchableOpacity>
                    <TextInput
                     style={styles.input}
                     placeholder={strings.filterZone}
                     ref="filterZone"
                     autoCorrect={false}
                     selectTextOnFocus={true}
                     underlineColorAndroid={"white"}
                     returnKeyType="next"
                     autoCapitalize="none"
                    />
                </View>
            </View>

        )
    }

    renderFilterIcon(){
            if(this.state.areFiltersVisible){
                return (
                    <Image source={require("../images/nofilter.png")}/>
                )
            }
            else{
                return (
                    <Image source={require("../images/filter.png")}/>
                )
            }
    }

    renderFiltersZone(){
        return (
            <View>
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

    filterIcon: {
        marginTop: 35,
        marginLeft: 20,
        marginRight: 20
    },

    input: {
        width: Dimensions.get('window').width,
        marginTop: 15,
        marginBottom: 15
    },
});