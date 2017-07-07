import React, {Component} from 'react';
import AppText from '../global/components/AppText';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Avatar from '../global/components/Avatar';
import strings from '../global/localizedStrings';
import ItemSpacer from '../global/components/ItemSpacer';
import colors from '../global/colors';
import CheckBox from 'react-native-check-box';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import {bindActionCreators} from 'redux';
import {registerUser, unregisterUser} from './events.actions';
import {connect} from 'react-redux';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

class Event extends Component {

    state = {
        isParticipating: this.props.event.participants.findIndex(participant =>
            parseInt(participant.id) === parseInt(this.props.user.id),
        ) !== -1,
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'edit') {
            this._goToEditEvent();
        }
        else if (event.id === 'showComments') {
            this._goToComments();
        }
    }

    render() {
        const mainInfo = this._renderMainInfo();
        const details = this._renderDetails();
        return (
            <View style={styles.mainContainer}>
                {mainInfo}
                {details}
                <ItemSpacer/>
            </View>
        );
    }

    _getCategoryColorFromId(id) {
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

    _goToEditEvent() {
        this.props.navigator.push({
            screen: 'events.editEvent',
            title: 'Modifier l\'évènement',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                eventId: this.props.eventId,
            },
        });
    }

    _renderDetails() {
        const eventPicture = this._renderEventPicture();
        const dateAndParticipants = this._renderEventDateAndParticipants();
        const description = <AppText style={styles.description}>{this.props.event.description}</AppText>;
        return (
            <View style={styles.eventDetails}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{flex: 0}}
                >
                    {eventPicture}
                    {dateAndParticipants}
                    {description}
                </ScrollView>
            </View>
        );
    }

    _renderEventDateAndParticipants() {
        const {event} = this.props;
        const countParticipants =
            <View style={styles.participationInfoItem}>
                <AppText style={styles.participationInfoContainer}>
                    {event.participants.length}
                </AppText>
                <AppText style={styles.secondaryParticipationInfoText}>
                    {strings.participantsLabel}
                </AppText>
            </View>;
        const checkParticipation = (
            <View style={{alignItems: 'center'}}>
                <CheckBox
                    isChecked={this.state.isParticipating}
                    onClick={() => this._onParticipationChange()}
                />
                <AppText>{strings.participationLabel}</AppText>
            </View>
        );
        const date = moment(this.props.event.datetime).calendar(
            {
                sameDay: "[Today]",
                nextDay: "[Tomorrow]",
                nextWeek: "dddd",
                lastDay: "[Yesterday]",
                lastWeek: "[Last] dddd",
                sameElse: "DD/MM/YYYY",
            });
        let splitDate=date.split('/');
        const day=splitDate[0];
        const time = splitDate[1];
        return (
            <View style={styles.dateAndParticipantsContainer}>
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

    _renderEventPicture() {
        const imageUrl = this.props.event.imageUrl || 'https://s3-eu-west-1.amazonaws.com/viseo-companion/defaultEventImage.jpeg';
        return (
            <Image
                style={{height: 200, width: width}}
                source={{uri: imageUrl}}

            />
        );
    }

    _renderHostInfo() {
        const {host} = this.props.event;
        const fullHostName = host.firstName + '  ' + host.lastName;
        return (
            <View style={styles.locationAndDate}>
                <Image style={styles.icon} resizeMode="contain" source={require('./../../images/user.png')}/>
                <AppText style={styles.locationAndDateText}>{fullHostName}</AppText>
            </View>
        );
    }

    _renderLocation() {
        return (
            <View style={styles.locationAndDate}>
                <Image style={styles.icon} resizeMode="contain" source={require('./../../images/location.png')}/>
                <AppText style={styles.locationAndDateText} numberOfLines={1}>{this.props.event.location}</AppText>
            </View>
        );
    }

    _renderMainInfo() {
        const {navigator} = this.props;
        const {host} = this.props.event;
        const hostAvatar =
            <Avatar
                firstName={host.firstName}
                lastName={host.lastName}
                style={{flex: 2.5, marginLeft: 5}}
                otherProfileId={host.id}
                navigator={navigator}
            />;
        const name = <AppText style={styles.name} numberOfLines={1}>{this.props.event.name}</AppText>;
        const categoryName = strings.categoriesNames[this.props.event.category];
        const category = <AppText>{categoryName}</AppText>;
        const categoryColor = this._getCategoryColorFromId(this.props.event.category);
        const categoryIndicator = <View style={[styles.categoryIndicator, {borderTopColor: categoryColor}]}/>;
        const hostInfo = this._renderHostInfo();
        const location = this._renderLocation();
        return (
            <View style={styles.mainInfo}>
                {hostAvatar}
                <View style={{flex: 6, flexDirection: 'column', paddingBottom: 20}}>
                    {name}
                    {category}
                    <View style={styles.locationAndDateContainer}>
                        {hostInfo}
                        {location}
                    </View>
                </View>
                {categoryIndicator}
            </View>
        );
    }

    _onParticipationChange() {
        const {isParticipating} = this.state;
        const {event, user} = this.props;
        isParticipating ?
            this.props.unregisterUser(event, user.id) :
            this.props.registerUser(event, user.id);
        this.setState({isParticipating: !isParticipating});
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

Event.propTypes = {
    eventId: PropTypes.number.isRequired,
    event: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    unregisterUser: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
};

Event.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/comments-128x128.png'),
            iconColor: 'white',
            id: 'showComments',
        },

    ],
};

const mapStateToProps = ({events, user}, ownProps) => ({
    event: events.items.find(event => parseInt(event.id) === ownProps.eventId),
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
)(Event);

const styles = StyleSheet.create({
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
    description: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
    },
    dateAndParticipantsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -20,
    },
    eventDetails: {
        flex: 30,
        flexDirection: 'column',
    },
    locationAndDate: {
        flex: 1,
        flexDirection: 'row',
    },
    locationAndDateContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationAndDateText: {
        flex: 5,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 15,
    },
    mainInfo: {
        flexDirection: 'row',
        height: height / 5,
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 20,
        flex: 2,
    },
    participationInfoRectangle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.1,
        width: width * 0.85,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingHorizontal: 20,
        paddingVertical: 5,
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