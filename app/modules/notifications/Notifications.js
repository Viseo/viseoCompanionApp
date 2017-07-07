import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../global/colors';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppText from '../global/components/AppText';
import NotificationCard from './NotificationCard';
import {fetchEventsExp, fetchReviewedEvents} from '../../actionCreators/events.depreciated';
import moment from 'moment';
import PropTypes from 'prop-types';

export class Notification extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.refreshPastEvents(this.props.user);
        this.props.refreshReviewedEvents(this.props.user.id);
    }

    render() {
        const reviewList = (
            <FlatList
                data={this.props.events}
                keyExtractor={(event, index) => event.id}
                renderItem={({item}) => this._renderNotificationCard(item)}
                onRefresh={() => {
                    this.props.refreshPastEvents(this.props.user);
                    this.props.refreshReviewedEvents(this.props.user.id);
                }}
                ListEmptyComponent={() => {
                    return this._renderEmptyNotificationCard();
                }}
                refreshing={this.props.refreshing}
            />
        );
        return (
            <View style={styles.mainContainer}>
                {reviewList}
            </View>
        );
    }

    _renderNotificationCard(event) {
        let day = moment(event.datetime).format('ddd D MMM');
        let time = moment(event.datetime).format('hh') + 'h' + moment(event.datetime).format('mm');
        return (
            <View>
                <NotificationCard
                    name={event.name}
                    location={event.location}
                    day={day}
                    time={time}
                    eventId={event.id}
                    userId={this.props.user.id}
                    navigator={this.props.navigator}
                />

            </View>
        );
    }

    _renderEmptyNotificationCard() {
        return (
            <View>
                <AppText
                    style={{
                        textAlign: 'center',
                        color: colors.mediumGray,
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: 'center',
                        fontSize: 18,
                        marginTop: 10,
                    }}
                >
                    Aucune notification.
                </AppText>
            </View>
        );
    }

}

Notification.propTypes = {
    events: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    refreshing: PropTypes.bool.isRequired,
    refreshPastEvents: PropTypes.func.isRequired,
    refreshReviewedEvents: PropTypes.func.isRequired,
};

const getParticipatingEventList = (events, eventsReviewed, user) => {
    let notReviewedEvents = [];
    if (events && eventsReviewed) {
        let eventsByUser = events.filter((event) => {
            const filter = event.participants.filter((e) => {
                return e.id === user.id;
            });
            return filter.length > 0;
        });
        if (eventsByUser.length > 0 && eventsReviewed.length > 0) {
            notReviewedEvents = eventsByUser.filter((item) => {
                return !eventsReviewed.includes(JSON.stringify(item));
            });
        }
    }
    return notReviewedEvents;
};

const mapStateToProps = (state) => ({
    events: getParticipatingEventList(
        state.events.itemsExpired, state.events.itemsReviewed, state.user,
    ),
    refreshing: state.events.isFetching,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refreshPastEvents: fetchEventsExp,
        refreshReviewedEvents: fetchReviewedEvents,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notification);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.blue,
        paddingHorizontal: 15,
    },
});