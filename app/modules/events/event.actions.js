import * as db from '../global/db';
import settings from '../global/settings';
import moment from 'moment';

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (event, userId) => {
    return async (dispatch) => {
        const createdEvent = await db.addEvent(event, userId);
        dispatch({
            type: ADD_EVENT,
            event: createdEvent,
        });
    };
};

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED';
export const fetchEvents = () => {
    return async (dispatch) => {
        dispatch(requestEvents());
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEventAfter(moment().toDate().getTime()));
            let events = await eventsResponse.json();
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
            console.warn('event participant added ' + event.version);
            //todo handle the received event
            if (event) {
                dispatch({
                    type: REGISTER_USER,
                    event,
                });
            }
        } catch (error) {
            console.warn('ActionCreators/events::registerUser ' + error);
        }
    };
};

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const updateEvent = (event) => {
    return async (dispatch) => {
        const updatedEvent = await db.updateEvent(event);
        dispatch({
            type: UPDATE_EVENT,
            event: updatedEvent,
        });
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
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.warn('ActionCreators/events::unregisterUser ' + error);
        }
    };
};