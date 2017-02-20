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
    RefreshControl
} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import settings from "../config/settings";
import Event from './../components/event';
import * as db from '../components/db';

var monthNames = ["Janv", "Fév", "Mars", "Avril", "Mai", "Juin", "Juill", "Août", "Sept", "Oct", "Nov", "Déc"];

function ThreePoints(text) {
    if (text.length > 25) {
        text = text.substr(0, 25) + "...";
    }
    return text;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
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
            hasEvents: false
        };
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
        if(events.length) {
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

    render() {
        var email = this.props.email;
        console.log(email);

        // Show loading indicator until all events are loaded
        // Then show all events in chronological order
        let eventList;
        if (this.state.loaded) {
            eventList = this.state.hasEvents ? this.renderEvents() : this.renderNoEventsToShow();
        } else {
            this.renderLoadingIndicator();
        }

        // For now only the admin can create events through the admin page
        let allowEventCreation = false;
        let createEventButton = allowEventCreation ? this.renderCreateEventButton() : null;

        return (
            <View>
                <View style={styles.topbar}>
                    <View style={styles.menu0}>
                        <Image source={require("../images/Menu.png")} style={styles.icon}/>
                    </View>
                    <Text style={styles.viseocompanion}> VISEO COMPANION </Text>
                </View>

                <Text style={styles.title}> Evénements:</Text>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    scrollEventThrottle={200}
                    style={styles.scrollView}>
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

    renderEventCard(event) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={ () => this.props.onEventClicked(event,this.props.email)}>
                    <View style={styles.rectangle}>
                        <View style={styles.leftRectangle}>
                            <Text style={styles.date}> {new Date(event.date).getDate()}</Text>
                            <Text style={styles.date}> {monthNames[new Date(event.date).getMonth()]}</Text>
                            <Text
                                style={styles.date}> {new Date(event.date).getHours()}h{addZero(new Date(event.date).getMinutes())}</Text>
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
                navigator={this.props.navigator}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard.bind(this)}
            />
        );
    }

    renderNoEventsToShow() {
        return (
            <Text>
                Whoops... There's nothing to show.
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
    width : deviceWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({

    topbar: {
        height: (1 / 13) * deviceHeight,
        backgroundColor: 'white',
        /*justifyContent:'space-between',*/
        flexDirection: 'row',
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
        justifyContent: 'center',
        textAlign: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },

    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        height: deviceHeight
    },

    rectangle: {
        width: 0.97 * deviceWidth,
        height: 0.2 * deviceHeight,
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 0,
        borderWidth: 0.3,
        borderColor: 'black',
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

    scrollView: {
        height: 0.85 * deviceHeight,
    },

    actionButtonIcon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});