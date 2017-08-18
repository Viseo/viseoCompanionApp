import React, {Component} from 'react';
import AppText from '../global/components/AppText';
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeout from 'react-native-swipe-out';
import moment from 'moment';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import strings from '../global/localizedStrings';
import Highlighter from 'react-native-highlight-words';
import colors from '../global/colors';
import {bindActionCreators} from 'redux';
import {registerUser, unregisterUser} from './events.actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';

function getCategoryColor(categoryId) {
    let eventCategoriesColors = [colors.red, colors.orange, colors.green];
    return eventCategoriesColors[categoryId];
}

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

        let {showImage, event} = this.props;
        let swipeOption = this.getSwipeOption();
        let imageUrl = event.imageUrl ? event.imageUrl
            :
            'https://s3-eu-west-1.amazonaws.com/viseo-companion/defaultEventImage.jpeg';

        if (event.imageUrl === '') {
            showImage = false;
        }
        let image = showImage ? (
                <View style={styles.imageEvent}>
                    <Image
                        source={{uri: imageUrl}}
                        style={styles.image}
                    >
                    </Image>
                </View>) :
            null;
        const liveIndicator = this._isLive() ? this.renderLiveIndicator() : this.renderDate();

        return (
            <View style={styles.container}>
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
                        onPress={() => this._goToEvent()}
                    >
                        {image}
                        <View style={styles.infosEvent}>
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
            <View style={[styles.eventType, {backgroundColor: getCategoryColor(this.props.event.category)}]}/>
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
        return (
            <View style={styles.eventInfo}>
                <View style={{flex: 1}}>
                    {this.renderTitle()}
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        {this.renderLocation()}
                        {this.renderHost()}
                    </View>
                    {this.renderParticipationIndicator()}
                </View>
            </View>
        );
    }

    renderHost() {
        let {host} = this.props.event;
        return (
            <View>
                <AppText style={styles.hostText}>{host.firstName} {host.lastName}</AppText>
            </View>
        );
    }

    renderLiveIndicator() {
        return (
            <View style={{flex: 3, marginVertical: 10}}>
                <Icon
                    name='podcast'
                    size={50}
                    style={{color: colors.red, textAlign: 'center', marginTop: 2}}
                />
                <AppText style={styles.liveIndicator}>Live</AppText>
            </View>
        );
    }

    renderTitle() {
        return (
            <View>
                <Highlighter
                    numberOfLines={1}
                    highlightStyle={styles.highlightStyle}
                    style={[styles.titleText, styleFont.textFont]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.event.name || ''}
                />
            </View>
        );
    }

    renderDate() {
        const date = moment(this.props.event.datetime).format('DD MMM HH:mm');
        let splitDate = date.split(' ');
        let [day, month, time] = splitDate;

        return (
            <View style={styles.date}>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[styles.dateText, styleFont.textFont]}
                        searchWords={this.props.searchWords}
                        textToHighlight={day}
                    />
                </View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[styles.monthText, styleFont.textFont]}
                        searchWords={this.props.searchWords}
                        textToHighlight={month}
                    />
                </View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        style={[styles.timeText, styleFont.textFont]}
                        searchWords={this.props.searchWords}
                        textToHighlight={time}
                    />
                </View>

            </View>
        );
    }

    renderLocation() {
        return (
            <View>
                <Highlighter
                    numberOfLines={2}
                    highlightStyle={styles.highlightStyle}
                    style={[
                        styles.locationText,
                        styleFont.textFont,
                    ]}
                    searchWords={this.props.searchWords}
                    textToHighlight={this.props.event.location || ''}
                />
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
        const canEdit = parseInt(this.props.event.host.id) === parseInt(this.props.user.id)
            && this.props.event.datetime >= moment();
        const canComment = this.props.event.datetime < moment();
        let navigatorButtons = {};
        if (canEdit) {
            navigatorButtons =
                {
                    rightButtons: [
                        {
                            title: 'Modifier',
                            id: 'edit',
                        },
                    ],
                };
        }
        if (canComment) {
            navigatorButtons =
                {
                    rightButtons: [
                        {
                            icon: require('../../images/comments-128x128.png'),
                            iconColor: 'white',
                            id: 'showComments',
                        },
                    ],
                };
        }
        Navigation.showModal({
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
        Navigation.showModal({
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
        const endDate = moment(this.props.event.datetime).add(2, 'hours');
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
    event: PropTypes.object,//.isRequired,
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
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 2,
    },
    imageEvent: {
        flex: 1,
    },
    image: {
        width: width,
        height: 200,
    },
    infosEvent: {
        flex: 2,
        flexDirection: 'row',
        height: 100,
    },
    date: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
    },
    eventType: {
        flex: .2,
        alignSelf: 'stretch',
        marginRight: 10,
        backgroundColor: '#ef4954',
    },
    eventInfo: {
        flex: 8,
        flexDirection: 'column',
        marginTop: 5,
    },

    highlightStyle: {
        backgroundColor: colors.highlight,
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    monthText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeTest: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    dotContainer: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    titleText: {
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    locationText: {
        color: colors.mediumGray,
        fontWeight: '200',
        fontSize: 16,
    },
    hostText: {
        color: colors.mediumGray,
        fontSize: 13,
        marginTop: 2,
    },
    liveIndicator: {
        color: colors.red,
        textAlign: 'center',
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

