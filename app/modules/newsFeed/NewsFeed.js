import React, {Component} from 'react';
import {Text, View} from 'react-native';
import EventCard from "../events/EventCard";
import {connect} from "react-redux";

class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        let notationPopup = this.props.isReviewPopupDismissed ? null : this._showNotationPopup();
        return (
            <View>
                {notationPopup}
                <Text>All the great stuff in one place!</Text>
               <EventCard  navigator={this.props.navigator}
                           eventId={2}
                           showImage={true}
               />
            </View>
        );
    }

    _formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split("/");
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
        if (event.id === "profile") {
            this._goToUserProfile();
        }
    }

    _goToUserProfile() {
        this.props.navigator.push({
            screen: 'user.myProfile',
            title: 'Mon profil',
        });
    }
}

NewsFeed.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/profile.png'),
            id: 'profile',
        },
    ],
};

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
    isReviewPopupDismissed : review.isReviewPopupDismissed,
});

export default connect(
    mapStateToProps,
)(NewsFeed);
