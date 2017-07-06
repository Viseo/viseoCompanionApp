import * as db from '../global/db';
import moment from 'moment';
import PushController from './../global/pushController';

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (event, userId) => {
    return async (dispatch) => {
        const createdEvent = await db.events.add(event, userId);
        dispatch({
            type: ADD_EVENT,
            event: createdEvent,
        });
    };
};

export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED';
export const fetchEvents = () => {
    return async (dispatch) => {
        dispatch(requestEvents());
        try {
            let events = await db.events.getAll();
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
    return async (dispatch) => {
        PushController.scheduleEventNotifications(event);
        try {
            const updatedEvent = await db.events.addParticipant(event.id, userId);
            dispatch({
                type: UPDATE_EVENT,
                event: updatedEvent,
            });
        } catch (error) {
            console.warn('ActionCreators/events::registerUser ' + error);
        }
    };
};

export const SELECT_EVENT = 'SELECT_EVENT';
export const selectEvent = (eventId) => ({
    type: SELECT_EVENT,
    eventId,
});

export const UNREGISTER_USER = 'UNREGISTER_USER';
export const unregisterUser = (event, userId) => {
    return async (dispatch) => {
        PushController.unscheduleEventNotifications(event);
        try {
            const updatedEvent = await db.events.removeParticipant(event.id, userId);
            dispatch({
                type: UPDATE_EVENT,
                event: updatedEvent,
            });
        } catch (error) {
            console.warn('ActionCreators/events::unregisterUser ' + error);
        }
    };
};

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const updateEvent = (event) => {
    return async (dispatch) => {
        const updatedEvent = await db.events.update(event);
        dispatch({
            type: UPDATE_EVENT,
            event: updatedEvent,
        });
    };
};

export const REMOVE_EVENT = 'REMOVE_EVENT';
export const deleteEvent = (id) => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_EVENT,
            id,
        });
        try {
            await db.events.delete(id);
        } catch (error) {
            console.warn('ActionCreators/events::deleteEvent ' + error);
        }
    };
};
