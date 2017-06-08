import React, {Component} from "react";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Swipeout from "react-native-swipe-out";
import strings from "../../global/localizedStrings";
import Highlighter from "react-native-highlight-words";
import * as util from "../../../util/util";
import colors from "../../global/colors";
import AppText from "../../global/AppText";
import moment from "moment";
import {defaultNavBarStyle} from "../../global/navigatorStyle";

export default class EventCard extends Component {

    constructor(props) {
        super(props);
    }

    getSwipeOption = () => {
        let textOption = this.props.participating ? strings.IAmNotGoingToEvent : strings.IAmGoingToEvent;
        let icon = this.props.participating ? require("../../../images/crossWhite.png") : require("../../../images/checkWhite.png");
        return [{
            component: <View className="participate" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={icon} style={{width: 33, height: 33}}/>
                <Text style={{color: 'white', fontSize: 14}}>
                    {textOption}
                </Text>
            </View>,
            onPress: () => {
                setTimeout(() => {
                    this.props.onParticipationChange()
                }, 300);
            },
            backgroundColor: this.props.participating ? '#ff6d6d' : colors.blue,
            color: 'white'
        }];
    };

    render() {
        let swipeOption = this.getSwipeOption();
        return (
            <View>
                <Swipeout
                    className="swipeout"
                    style={{backgroundColor: 'white'}}
                    left={swipeOption}
                    right={swipeOption}
                    autoClose={true}
                    overflow="hidden"
                    sensitivity={(Platform.OS === 'ios') ? 1 : 2}
                >
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => this._goToEvent()}
                    >
                        {this.renderParticipationIndicator()}
                        {this.renderTypeIndicator()}
                        {this.renderEventInfo()}
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    renderSpacer() {
        return (
            <View
                style={{
                    flex: 1,
                    alignSelf: 'stretch'
                }}
            >
            </View>
        );
    }

    renderTypeIndicator() {
        return (
            <View style={[styles.eventType, {backgroundColor: util.getCategoryColor(this.props.category)}]}/>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={[
                    styles.dot,
                    {backgroundColor: (this.props.participating) ? colors.lightBlue : 'white'}
                ]}/>
            </View>
        );
    }

    renderEventInfo() {
        const liveIndicator = this._isLive() ? this.renderLiveIndicator() : null;
        return (
            <View style={styles.eventInfo}>
                {this.renderSpacer()}
                <View style={styles.firstRow}>
                    {liveIndicator}
                    {this.renderTitle()}
                    {this.renderDate()}
                </View>
                <View style={styles.secondRow}>
                    {this.renderLocation()}
                    {this.renderDescription()}
                </View>
                {this.renderSpacer()}
            </View>
        );
    }

    renderLiveIndicator() {
        return (
            <View>
                <AppText style={styles.liveIndicator}>Live</AppText>
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={styles.name}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.nameText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.name || ''}
                />
            </View>
        );
    }

    renderDescription() {
        return (
            <View style={styles.description}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.descriptionText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.description || ''}
                />
            </View>
        );
    }

    renderDate() {
        return (
            <View style={styles.date}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.dateText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.day || ''}
                />
            </View>
        );
    }

    renderLocation() {
        return (
            <View style={styles.location}>
                <View style={{flex: 3}}>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[
                            styles.locationText,
                            styleFont.textFont,
                        ]}
                        searchWords={this.props.searchWords}
                        textToHighlight={this.props.location || ''}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[
                            styles.dateText,
                            styleFont.textFont,
                        ]}
                        searchWords={this.props.searchWords}
                        textToHighlight={this.props.time || ''}
                    />
                </View>
            </View>

        );
    }

    _goToEvent() {
        if(this._isLive()) {
            this._showLiveEvent();
        } else {
            this._showEventDetails();
        }
    }

    _showEventDetails() {
        this.props.navigator.push({
            title: "Détails de l'évènement",
            screen: 'events.event',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                hostFirstName: this.props.host.firstName,
                hostLastName: this.props.host.lastName,
                id: this.props.id,
                location: this.props.location,
                name: this.props.name,
                numberOfParticipants: this.props.participants.length,
                description: this.props.description,
                imageUrl: this.props.images,
                day: this.props.day,
                time: this.props.time,
                onParticipationChange: this.props.onParticipationChange,
                participating: this.props.participating,
                category: this.props.category,
            },
        });
    }

    _showLiveEvent() {
        this.props.navigator.push({
            title: this.props.name + " - LIVE",
            screen: 'events.liveEvent',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.id,
                name: this.props.name,
                numberOfParticipants: this.props.participants.length,
            }
        });
    }

    _isLive() {
        const startDate = moment(this.props.date);
        const endDate = moment(startDate).add(2, 'hours');
        return moment().isBetween(startDate, endDate);
    }
}

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
    },
    eventInfo: {
        flex: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    firstRow: {
        flex: 3,
        flexDirection: 'row',
        paddingRight: 10
    },
    liveIndicator: {
        backgroundColor: colors.red,
        color: 'white',
        marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 2,
        fontWeight: 'bold'
    },
    secondRow: {
        flex: 6,
        flexDirection: 'column',
        paddingRight: 10
    },
    name: {
        flex: 6,
        justifyContent: 'flex-end',
    },
    nameText: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16,
        color: 'black',
    },
    date: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    dateText: {
        textAlign: 'right',
        fontWeight: '100',
        color: colors.mediumGray,
        fontSize: 14
    },
    description: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 5,
    },
    descriptionText: {
        textAlign: 'left',
        fontWeight: '100',
        fontSize: 14,
        overflow: 'hidden',
        color: colors.mediumGray,
    },
    location: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    locationText: {
        textAlign: 'left',
        fontWeight: '300',
        color: '#8c8c8c',
        fontSize: 14
    },
    dotContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    firstColumn: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    secondColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    eventType: {
        width: 3,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ef4954',
    },

    highlightStyle: {
        backgroundColor: colors.highlight
    }
});

const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
});
