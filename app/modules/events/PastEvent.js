import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../global/components/AppText';
import ItemSpacer from '../global/components/ItemSpacer';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import colors from '../global/colors';
import PropTypes from 'prop-types';
import strings from '../global/localizedStrings';
import moment from 'moment';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import UserAvatar from 'react-native-user-avatar';

const eventIdToImages = {
    '40': require('./../../images/events/formation_securite.jpg'),
    '0': require('./../../images/events/0.jpg'),
    '7': require('./../../images/events/blockchain-iot.jpg'),
    '41': require('./../../images/events/poker_jeux.jpg'),
    '42': require('./../../images/events/concert-de-rock.jpg'),
    '39': require('./../../images/coderdojo.jpg'),
    '44': require('./../../images/events/formationAgile.jpg'),
    '43': require('./../../images/events/reactive-nativingitup-png-800x600_q96.png'),
    '38': require('./../../images/events/soiree_nouveaux.jpg'),
    '46': require('./../../images/events/tdd.png'),
};
let defaultImage = require('./../../images/events/defaultEventImage.jpeg');
const {height} = Dimensions.get('window');

class PastEvent extends Component {

    constructor(props) {
        super(props);
        let picture = eventIdToImages[this.props.id] || defaultImage;
        this.state = {
            picture,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    getCategoryNameFromId(id) {
        return strings.categoriesNames[id];
    }

    getCategoryColorFromId(id) {
        switch (id) {
            case 0:
                return colors.red;
            case 1:
                return colors.orange;
            case 2:
                return colors.green;
            default:
                return 'transparent';
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    {this.renderMainInfo()}
                    <ItemSpacer/>
                    {this.renderDetails()}
                </View>
            </View>
        );
    }

    renderMainInfo() {
        const {hostFirstName, hostLastName, host, navigator} = this.props;
        const hostAvatar =
            <TouchableOpacity>
                <UserAvatar
                    style={{marginLeft: 5}}
                    size="90"
                    color={colors.avatarGray}
                    name={host.firstName + ' ' + host.lastName}
                    navigator={navigator}
                />
            </TouchableOpacity>;
        const name = <AppText style={styles.name}>{this.props.name}</AppText>;
        const category = <AppText>{this.getCategoryNameFromId(this.props.category)}</AppText>;
        const categoryIndicator = (
            <View style={[
                styles.categoryIndicator,
                {borderTopColor: this.getCategoryColorFromId(this.props.category)},
            ]}
            />
        );
        const username = (
            <View style={styles.locationAndDate}>
                <Image style={styles.icon} resizeMode="contain" source={require('./../../images/user.png')}/>
                <ItemSpacer/>
                <AppText style={{flex: 5, textAlign: 'left'}}>
                    {hostFirstName} {hostLastName}
                </AppText>
            </View>
        );
        const location = (
            <View style={styles.locationAndDate}>
                <Image style={styles.icon} resizeMode="contain" source={require('./../../images/location.png')}/>
                <ItemSpacer/>
                <AppText style={{flex: 5, textAlign: 'left', textAlignVertical: 'center'}}>
                    {this.props.location}
                </AppText>
            </View>
        );
        const eventInfo = (
            <View style={{flex: 6, flexDirection: 'column'}}>
                {name}
                {category}
                <View style={styles.locationAndDateContainer}>
                    {username}
                    {location}
                </View>
            </View>
        );
        return (
            <View style={{flex: 8, flexDirection: 'row'}}>
                {hostAvatar}
                {eventInfo}
                {categoryIndicator}
            </View>
        );
    }

    renderDetails() {
        let {event} = this.props;
        return (
            <View style={{flex: 30, flexDirection: 'column'}}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{flex: 0}}
                >
                    {this.renderEventPicture(this.props.id)}
                    {this.renderEventDateAndParticipants()}
                    {this.renderEventDescription(this.state.description)}
                </ScrollView>
                <KeyboardSpacer/>
            </View>
        );
    }

    renderEventPicture() {
        const picture =
            <Image
                style={{minHeight: height / 3}}
                source={this.state.picture}
                resizeMode="cover"
            />
        ;
        return (
            <View style={{flex: 2, marginBottom: -20}}>
                {picture}
            </View>
        );
    }

    renderEventDateAndParticipants() {
        let [day, time] = this.formatDate(this.props.datetime);
        const countParticipants =
            <View style={styles.participationInfoItem}>
                <AppText style={styles.participationInfoContainer}>
                    {'1'}
                </AppText>
                <AppText style={styles.secondaryParticipationInfoText}>
                    {strings.participantsLabel}
                </AppText>
            </View>;
        const checkParticipation =
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={this.props.participating ?
                    require('./../../images/checked.png') :
                    require('./../../images/incheck_box.png')
                }/>
                <AppText>
                    Participation
                </AppText>
            </View>
        ;
        return (
            <View style={{alignItems: 'center'}}>
                <View style={styles.participationInfoRectangle}>
                    {countParticipants}
                    <View style={styles.participationInfoItem}>
                        <AppText style={styles.participationInfoContainer}>
                            {day}
                        </AppText>
                        <AppText style={styles.secondaryParticipationInfoText}>
                            à {time}
                        </AppText>
                    </View>
                    <View style={styles.participationInfoItem}>
                        {checkParticipation}
                    </View>
                </View>
            </View>
        );
    }

    renderEventDescription() {
        return (
            <AppText style={[styles.description, {marginTop: 20}]}>
                {this.props.description}
            </AppText>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'showComments') {
            this._goToComments();
        }
    }

    _goToComments() {
        const navigatorButtons = this.props.participating ?
            {
                rightButtons: [
                    {
                        icon: require('../../images/navigation/add.png'),
                        id: 'addComment',
                    },
                ],
            } :
            {};
        this.props.navigator.push({
            screen: 'Comments',
            title: 'Commentaires',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
            navigatorButtons,
        });
    }

}

PastEvent.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    datetime: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    participants: PropTypes.number.isRequired,
    hostFirstName: PropTypes.string.isRequired,
    hostLastName: PropTypes.string.isRequired,
};

PastEvent.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/comments-128x128.png'),
            iconColor: 'white',
            id: 'showComments',
        },

    ],
};

const getEventWithId = (events, id) => {
    return events.find(event => event.id === id);
};

const getEventParticipantsFromId = (events, id) => {
    let event = events.find(event => event.id === id);
    if (!event)
        event = {
            name: '',
            description: '',
            date: '',
            location: '',
            keywords: '',
        };
    return event.hasOwnProperty('participants') ?
        event.participants :
        [];
};

const mapStateToProps = ({events, user}, ownProps) => {
    const event = getEventWithId(events.itemsExpired, ownProps.id);
    const participants = getEventParticipantsFromId(events.items, ownProps.id).length;
    const username = user.firstName;
    return {
        ...event,
        participants,
        username,
        eventId: ownProps.id,
        ...ownProps,
    };
};

export default connect(
    mapStateToProps,
    null,
)(PastEvent);

let {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    categoryDropdown: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
        fontSize: 15,
        backgroundColor: 'transparent',
        padding: 0,
        color: colors.mediumGray,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 15,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    keywords: {
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
    },
    categoryIndicator: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30,
        borderTopWidth: 30,
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'},
        ],
    },
    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        fontSize: 40,
        backgroundColor: colors.lightGray,
        textAlign: 'center',
        color: 'white',
    },
    organizatorPicture: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    contentContainer: {
        flex: 3,
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 22,
        flex: 2,
    },
    category: {
        textAlign: 'left',
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 5,
    },
    locationAndDateContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationAndDate: {
        flex: 1,
        flexDirection: 'row',
    },
    participationInfoRectangle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: deviceHeight * 0.1,
        width: deviceWidth * 0.85,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingLeft: deviceWidth * 0.05,
        paddingRight: deviceWidth * 0.05,
    },
    participationInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    participationInfoContainer: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    secondaryParticipationInfoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    icon: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
});