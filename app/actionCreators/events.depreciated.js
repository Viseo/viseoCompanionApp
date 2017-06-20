import settings from '../modules/global/settings';
import moment from 'moment';

export const types = {
    GET_EVENT_EXPIRE: 'GET_EVENT_EXPIRE',
    INVALIDATE_EVENTS: 'INVALIDATE_EVENTS',
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
            let eventsJson = await eventsResponse.json();
            let events = getEventsFromJson(eventsJson);
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

//Ported
function getEventsFromJson(json) {
    let events = [];
    for (let i = 0; i < json.length; i++) {
        let event = json[i];

        events.push({
            id: event.id,
            name: event.name,
            description: event.description,
            date: event.datetime,
            location: event.place,
            version: event.version,
            category: event.category,
            host: event.host,
            imageUrl: event.imageUrl,
            participants: event.participants,
        });
    }
    return events;
}

const receiveEventsExpired = (events) => ({
    type: types.RECEIVE_EVENTS_EXPIRED,
    events,
});

const requestEventsExpired = () => ({
    type: types.REQUEST_EVENTS_EXPIRED,
});
