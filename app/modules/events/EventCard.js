import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeout from 'react-native-swipe-out';
import strings from '../global/localizedStrings';
import Highlighter from 'react-native-highlight-words';
import * as util from '../../util/util';
import colors from '../global/colors';
import AppText from '../global/components/AppText';
import moment from 'moment';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {registerUser, unregisterUser} from './events.actions';
import {connect} from 'react-redux';

class EventCard extends Component {

    state = {
        isParticipating: this.props.event.participants.findIndex(participant =>
            parseInt(participant.id) === parseInt(this.props.user.id),
        ) !== -1,
    };

    constructor(props) {
        super(props);
    }

    getSwipeOption = () => {
        let textOption = this.state.isParticipating ? strings.IAmNotGoingToEvent : strings.IAmGoingToEvent;
        let icon = this.state.isParticipating ? require('../../images/crossWhite.png') : require('../../images/checkWhite.png');
        return [{
            component: <View className="participate" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={icon} style={{width: 33, height: 33}}/>
                <Text style={{color: 'white', fontSize: 14}}>
                    {textOption}
                </Text>
            </View>,
            onPress: () => {
                setTimeout(() => {
                    this._onParticipationChange();
                }, 300);
            },
            backgroundColor: this.state.isParticipating ? '#ff6d6d' : colors.blue,
            color: 'white',
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
                    alignSelf: 'stretch',
                }}
            >
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
                    {backgroundColor: (this.state.isParticipating) ? colors.lightBlue : 'white'},
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
                    textToHighlight={this.props.event.name || ''}
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
                    textToHighlight={this.props.event.description || ''}
                />
            </View>
        );
    }

    renderDate() {
        const day = moment(this.props.event.datetime)
            .format('ddd');
        return (
            <View style={styles.date}>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.dateText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={day}
                />
            </View>
        );
    }

    renderLocation() {
        const time = moment(this.props.event.datetime)
            .format('[à] hh[h] mm');
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
                        textToHighlight={this.props.event.location || ''}
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
                        title: 'Modifier',
                        id: 'edit',
                    },
                ],
            } :
            {};
        this.props.navigator.push({
            title: 'Détails de l\'évènement',
            screen: 'events.event',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
            navigatorButtons,
        });
    }

    _showLiveEvent() {
        this.props.navigator.push({
            title: this.props.event.name + ' - LIVE',
            screen: 'events.liveEvent',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
        });
    }

    _isLive() {
        const startDate = moment(this.props.event.datetime);
        const endDate = moment(startDate).add(2, 'hours');
        return moment().isBetween(startDate, endDate);
    }
}

EventCard.propTypes = {
    eventId: PropTypes.number.isRequired,
    event: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    unregisterUser: PropTypes.func.isRequired,
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
        paddingRight: 10,
    },
    liveIndicator: {
        backgroundColor: colors.red,
        color: 'white',
        marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 2,
        fontWeight: 'bold',
    },
    secondRow: {
        flex: 6,
        flexDirection: 'column',
        paddingRight: 10,
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
        fontSize: 14,
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
        fontSize: 14,
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
        backgroundColor: colors.highlight,
    },
});

const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
});
