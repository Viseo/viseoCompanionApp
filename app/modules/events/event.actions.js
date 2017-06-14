import * as db from '../global/db';
import settings from '../global/settings';
import moment from 'moment';

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (event) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_EVENT,
            ...event
        });
        await db.addEvent(event);
    };
};

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED';
export const fetchEvents = (user) => {
    return async (dispatch) => {
        dispatch(requestEvents());
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEventAfter(moment().toDate().getTime()));
            let eventsJson = await eventsResponse.json();
            let events = getEventsFromJson(eventsJson);
            dispatch(receiveEvents(events));
        } catch (error) {
            console.warn('ActionCreators/events::fetchEvents ' + error);
            dispatch({
                type: FETCH_EVENTS_FAILED,
                error,
            });
        }
    };
};

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
const requestEvents = () => ({
    type: REQUEST_EVENTS,
});

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
const receiveEvents = (events) => ({
    type: RECEIVE_EVENTS,
    events,
    receivedAt: Date.now(),
});

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = (event, userId) => {
    let eventId = event.id;
    return async (dispatch) => {
        PushController.scheduleEventNotifications(event);
        try {
            let event = db.addEventParticipant(eventId, userId);
            //todo handle the received event
            if(event) {
                dispatch({
                    type: REGISTER_USER,
                    event
                })
            }
        } catch (error) {
            console.warn('ActionCreators/events::registerUser ' + error);
        }
    };
};

export const UNREGISTER_USER = 'UNREGISTER_USER';
export const unregisterUser = (event, userId) => {
    let eventId = event.id;
    return async (dispatch) => {
        PushController.unscheduleEventNotifications(event);
        dispatch({
            type: UNREGISTER_USER,
            eventId,
            userId,
        });
        try {
            await fetch(settings.api.removeEventParticipant(eventId, userId), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.warn('ActionCreators/events::unregisterUser ' + error)
        }
    }
};


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