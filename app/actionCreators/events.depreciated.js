import settings from '../modules/global/settings';
import moment from 'moment';

export const types = {
    GET_EVENT_EXPIRE: 'GET_EVENT_EXPIRE',
    REQUEST_EVENTS_EXPIRED: 'REQUEST_EVENTS_EXPIRED',
    RECEIVE_EVENTS_EXPIRED: 'RECEIVE_EVENTS_EXPIRED',
    REMOVE_EVENT: 'REMOVE_EVENT',
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
            console.warn('ActionCreators/events::fetchEventsExp' + error);
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error,
            });
        }

    };
};

const receiveEventsExpired = (events) => ({
    type: types.RECEIVE_EVENTS_EXPIRED,
    events,
});

const requestEventsExpired = () => ({
    type: types.REQUEST_EVENTS_EXPIRED,
});
