import React, {Component} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import colors from "../global/colors";
import {bindActionCreators} from "redux";
import {defaultNavBarStyle} from "../global/navigatorStyle";
import {connect} from "react-redux";
import AppText from "../global/components/AppText";
import PropTypes from "prop-types";
import NotificationCard from "./NotificationCard";
import {fetchEventsExp, fetchReviewedEvents} from "../../actionCreators/events.depreciated";

class Notification extends Component {

    constructor(props) {
        super(props);
        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
                onRefresh={() => this.props.refreshPastEvents(this.props.user)}
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
        return (
            <View>
                <NotificationCard
                    name={event.name}
                    location={event.location}
                    date={event.date}
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
                        textAlign: "center",
                        color: colors.mediumGray,
                        backgroundColor: "white",
                        height: 50,
                        borderRadius: 4,
                        textAlignVertical: "center",
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
    eventId: PropTypes.number.isRequired,
};

const getParticipatingEventList = (events, eventsReviewed) => {

    let notReviewedEvents = events.filter((item) => {
        return !eventsReviewed.has(item);
    });
    return notReviewedEvents;
};
const mapStateToProps = (state) => ({
    events: getParticipatingEventList(
        state.events.itemsExpired, state.events.itemsReviewed,
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
        flexDirection: "column",
        backgroundColor: colors.blue,
        paddingHorizontal: 15,
    },

});