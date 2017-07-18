import React, {Component} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import UserAvatar from 'react-native-user-avatar';

class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        // todo take care of this buggy and ugly popup
        // let notationPopup = this.props.isReviewPopupDismissed ? null : this._showNotationPopup();
        const notationPopup = null;
        return (
            <View style={{backgroundColor: colors.lightBlue}}>
                {this._renderHeadband()}
                {this._renderProfile()}
                {this._renderLive()}
            </View>
        );
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    _showNotationPopup = () => {
        let {events} = this.props;
        if (events && events.length > 0) {
            let [day, time] = this._formatDate(events[0].datetime);
            const date = day + " à " + time;
            this.props.navigator.showLightBox({
                screen: "notation.popup",
                title: "Multi popup",
                style: {
                    backgroundBlur: "dark",
                    backgroundColor: "#135caa70",
                },
                passProps: {
                    eventName: events[0].name,
                    location: events[0].location,
                    date: date,
                    eventId: events[0].eventId,
                    userId: this.props.user.id,
                },
            });
        }

    };

    onNavigatorEvent(event) {
        if (event.id === 'Notifications') {
            this._goToNotifications();
        }
    }

    _goToNotifications() {
        this.props.navigator.push({
            screen: 'Notifications',
            title: 'Notifications',
        });
    }

    _renderHeadband() {
        return (
            <Image
                source={require('../../images/NIVEAUX_BANDEAU_1.jpg')}
                style={{alignContent: 'center', width: 800, height: 150}}
            />
        );
    }

    _renderProfile() {
        return (
            <View style={styles.profileContainer}>
                <UserAvatar
                    style={{alignItems: 'center'}}
                    name={'Aziz BEN MILED'}
                    size="100"
                />
                <AppText style={{color: '#000000'}}>
                    Aziz
                </AppText>
                <Button
                    title={'editer'}
                    onPress={() => {
                        console.warn('ok');
                    }}
                />
            </View>
        );
    }

    _renderLive() {
        return (
            <View style={{
                backgroundColor: colors.white,
                alignContent: 'center',
                marginTop: 20,
                marginRight: 20,
                marginLeft: 20,
            }}>
                <AppText style={{fontSize: 18, color: colors.red}}>
                    En direct
                </AppText>
                <View style={{backgroundColor: colors.red, height: 5}}/>
            </View>
        );
    }
}

NewsFeed.propTypes = {
    navigator: PropTypes.object.isRequired,
};

NewsFeed.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/notifications.png'),
            id: 'Notifications',
        },
    ],
};

const styles = StyleSheet.create({
    profileContainer: {
        marginTop: -50,
        padding: 50,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: colors.red,
        alignContent: 'center',
    },
});

const getToReviewEvents = (events, eventsReviewed, user) => {

    if (events && eventsReviewed) {
        let eventsByUser = events.filter((event) => {
            const filter = event.participants.filter((e) => {
                return e.id === user.id;
            });
            return filter.length > 0;
        });

        if (eventsByUser.length > 0 && eventsReviewed.length > 0) {
            let notReviewedEvents = eventsByUser.filter((item) => {
                return !JSON.stringify(eventsReviewed).includes(JSON.stringify(item));
            });
            return notReviewedEvents;
        }
        else {
            return eventsByUser;
        }
    }
    return null;
};

const mapStateToProps = ({events, user, review}) => ({
    events: getToReviewEvents(
        events.itemsExpired,
        events.itemsReviewed,
        user,
    ),
    user,
    isReviewPopupDismissed: review.isReviewPopupDismissed,
});

export default connect(
    mapStateToProps,
)(NewsFeed);
