import settings from '../modules/global/settings';
import moment from 'moment';

// todo refactor: finish importing used methods into events.actions.js, then remove this from project

export const types = {
    GET_EVENT_EXPIRE: "GET_EVENT_EXPIRE",
    REQUEST_EVENTS_EXPIRED: "REQUEST_EVENTS_EXPIRED",
    RECEIVE_EVENTS_EXPIRED: "RECEIVE_EVENTS_EXPIRED",
    REMOVE_EVENT: "REMOVE_EVENT",
    RECEIVE_EVENTS_REVIEWED:"RECEIVE_EVENTS_REVIEWED",
    REQUEST_EVENTS_REVIEWED:"REQUEST_EVENTS_REVIEWED"
};

export const fetchEventsExp = (user) => {
    return async (dispatch) => {
        dispatch(requestEventsExpired());
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEventsBefore(moment().toDate().getTime()));
            let events = await eventsResponse.json();

            dispatch(receiveEventsExpired(events));
        } catch (error) {
            console.warn("ActionCreators/events::fetchEventsExp" + error);
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error,
            });
        }

    };
};

export const fetchReviewedEvents = (userId) => {
    return async (dispatch) => {
        dispatch(requestReviewedEvents());
        try {
            let response = await fetch(settings.api.getReviewedEvents(userId), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let events = await response.json();

            dispatch(receiveReviewedEvents(events));
        } catch (error) {
            console.log("db::getReviewedEvents " + error);
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error,
            });
        }
    };
};
const receiveReviewedEvents = (events) => ({
    type: types.RECEIVE_EVENTS_REVIEWED,
    events,
});
const requestReviewedEvents = () => ({
    type: types.REQUEST_EVENTS_REVIEWED,
});

const receiveEventsExpired = (events) => ({
    type: types.RECEIVE_EVENTS_EXPIRED,
    events,
});

const requestEventsExpired = () => ({
    type: types.REQUEST_EVENTS_EXPIRED,
});
