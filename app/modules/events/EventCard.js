import React, {Component} from "react";
import AppText from "../global/components/AppText";
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Swipeout} from "react-native-swipe-out";
import moment from "moment";
import {defaultNavBarStyle} from "../global/navigatorStyle";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import strings from "../global/localizedStrings";
import colors from "../global/colors";
import {bindActionCreators} from "redux";
import {registerUser, unregisterUser} from "./events.actions";

class EventCard extends Component {
    state = {
        isParticipating: this._isCurrentUserParticipating(this.props.event),
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({event}) {
        this.setState({
            isParticipating: this._isCurrentUserParticipating(event),
        });
    }

    getSwipeOption = () => {
        let textOption = this.state.isParticipating ? strings.IAmNotGoingToEvent : strings.IAmGoingToEvent;
        let icon = this.state.isParticipating ? require("../../images/crossWhite.png") : require("../../images/checkWhite.png");
        return [{
            component: <View className="participate" style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source={icon} style={{width: 33, height: 33}}/>
                <Text style={{color: "white", fontSize: 14}}>
                    {textOption}
                </Text>
            </View>,
            onPress: () => {
                setTimeout(() => {
                    this._onParticipationChange();
                }, 300);
            },
            backgroundColor: this.state.isParticipating ? "#ff6d6d" : colors.blue,
            color: "white",
        }];
    };

    render() {
        let {showImage, event} = this.props;
        let swipeOption = this.getSwipeOption();
        let imageUrl = event.imageUrl ? event.imageUrl
            :
            "https://s3-eu-west-1.amazonaws.com/viseo-companion/defaultEventImage.jpeg";

        let image = showImage ? (
            <View style={style.imageEvent}>
                <Image
                    source={{uri: imageUrl}}
                    style={{width: 900, height: 900}}
                >
                </Image>
            </View>) :
            null;
        const liveIndicator = this._isLive() ? this.renderLiveIndicator() : this.renderDate();

        return (

            <View style={styles.container}>
                <Swipeout
                className="swipeout"
                style={{backgroundColor: "white"}}
                left={swipeOption}
                right={swipeOption}
                autoClose={true}
                overflow="hidden"
                sensitivity={(Platform.OS === "ios") ? 1 : 2}
                >
                <TouchableOpacity
                style={styles.card}
                onPress={() => this._goToEvent()}
                >
                {image}
                <View style={style.infosEvent}>
                {liveIndicator}
                {this.renderTypeIndicator()}
                {this.renderEventInfo()}
                </View>
                </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    renderTypeIndicator() {
        return (
            <View style={[styles.eventType, {backgroundColor: util.getCategoryColor(this.props.event.category)}]}/>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={[
                    styles.dot,
                    {backgroundColor: (this.state.isParticipating) ? colors.lightBlue : "white"},
                ]}/>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>
                {this.renderSpacer()}
                <View style={{flex: 1}}>
                    {this.renderTitle()}
                </View>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <View>
                        {this.renderLocation()}
                        {this.renderHost()}
                        {this.renderDescription()}
                    </View>
                    {this.renderParticipationIndicator()}
                </View>

            </View>
        );
    }

    renderHost() {
        let host = this.props.user.host;
        <View>
            <AppText>{host}</AppText>
        </View>;
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
                    textToHighlight={this.props.event.name || ""}
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
                    textToHighlight={this.props.event.description || ""}
                />
            </View>
        );
    }

    renderDate() {
        const date = moment(this.props.event.datetime).calendar(
            {
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                nextWeek: "dddd",
                lastDay: "[Yesterday]",
                lastWeek: "[Last] dddd",
                sameElse: "DD/MM/YYYY",
            });
        let splitDate = date.split("/");
        let [day, time] = splitDate;

        return (
            <View style={styles.date}>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[styles.dateText, styleFont.textFont]}
                        searchWords={this.props.searchWords}
                        textToHighlight={day}
                    /></View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[styles.dateText, styleFont.textFont]}
                        searchWords={this.props.searchWords}
                        textToHighlight={time}
                    />
                </View>

            </View>
        );
    }

    renderLocation() {
        const time = moment(this.props.event.datetime)
            .format("[à] hh[h] mm");
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
                        textToHighlight={this.props.event.location || ""}
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
                        textToHighlight={time}
                    />
                </View>
            </View>

        );
    }

    _goToEvent() {
        if (this._isLive()) {
            this._showLiveEvent();
        } else {
            this._showEventDetails();
        }
    }

    _onParticipationChange() {
        const {isParticipating} = this.state;
        const {event, user} = this.props;
        isParticipating ?
            this.props.unregisterUser(event, user.id) :
            this.props.registerUser(event, user.id);
        this.setState({isParticipating: !isParticipating});
    }

    _showEventDetails() {
        const canEdit = parseInt(this.props.event.host.id) === parseInt(this.props.user.id);
        const navigatorButtons = canEdit ?
            {
                rightButtons: [
                    {
                        title: "Modifier",
                        id: "edit",
                    },
                ],
            } :
            {};
        this.props.navigator.push({
            title: "Détails de l'évènement",
            screen: "events.event",
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
            navigatorButtons,
        });
    }

    _showLiveEvent() {
        this.props.navigator.push({
            title: this.props.event.name + " - LIVE",
            screen: "events.liveEvent",
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
        });
    }

    _isLive() {
        const startDate = moment(this.props.event.datetime);
        const endDate = moment(this.props.event.datetime).add(2, "hours");
        return moment().isBetween(startDate, endDate);
    }

    _isCurrentUserParticipating(event) {
        if (event) {

            return event.participants.findIndex(participant =>
                    parseInt(participant.id) === parseInt(this.props.user.id),
                ) !== -1;
        }

    }
}

EventCard.propTypes = {
    eventId: PropTypes.number.isRequired,
    event: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    unregisterUser: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
};

const mapStateToProps = ({events, user, searchWords}, ownProps) => ({
    event: events.items.find(event => parseInt(event.id) === ownProps.eventId),
    searchWords,
    user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        registerUser,
        unregisterUser,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    imageEvent: {
        flex: 1,

    },
    infosEvent: {
        flex: 2,
        flexDirection: "row",
    },
    date: {
        flex: 4,
        flexDirection: "column",
    },
    eventType: {
        width: 3,
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#ef4954",
    },
    eventInfo: {
        flex: 8,
        flexDirection: "column",
    },
});
