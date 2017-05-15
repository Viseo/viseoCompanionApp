/**
 * Created by AAB3605 on 03/04/2017.
 */
import settings from "./../config/settings";
import {getEventParticipants, addEvent as pushEvent, updateEvent as updateEventDb, deleteEventDb} from "./../util/db";
import PushController from "../util/pushController";
import moment from "moment";

export const types = {
    ADD_EVENT: 'ADD_EVENT',
    ADD_EVENTS: 'ADD_EVENTS',
    FETCH_EVENTS: 'FETCH_EVENTS',
    FETCH_EVENTS_FAILED: 'FETCH_EVENTS_FAILED',
    GET_EVENT: 'GET_EVENT',
    GET_EVENT_EXPIRE:'GET_EVENT_EXPIRE',
    INVALIDATE_EVENTS: 'INVALIDATE_EVENTS',
    REQUEST_EVENTS_EXPIRED:'REQUEST_EVENTS_EXPIRED',
    RECEIVE_EVENTS_EXPIRED: 'RECEIVE_EVENTS_EXPIRED',
    REQUEST_EVENTS: 'REQUEST_EVENTS',
    RECEIVE_EVENTS: 'RECEIVE_EVENTS',
    REGISTER_USER: 'REGISTER_USER',
    REMOVE_EVENT: 'REMOVE_EVENT',
    UNREGISTER_USER: 'UNREGISTER_USER',
    UPDATE_EVENT: 'UPDATE_EVENT',
    UPDATE_EVENT_PARTICIPANTS: 'UPDATE_EVENT_PARTICIPANTS',
}

export const addEvent = (event) => {
    return async (dispatch) => {
        dispatch({
            type: types.ADD_EVENT,
            ...event
        })
        await pushEvent(event)
    }
}

export const fetchEventParticipants = (id) => {
    return async (dispatch) => {
        let participants = await getEventParticipants(id)
        dispatch({
            type: types.UPDATE_EVENT_PARTICIPANTS,
            id,
            participants
        })
    }
}

export const fetchEvents = (user) => {
    return async (dispatch) => {
        dispatch(requestEvents())
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEventAfter(moment().toDate().getTime()))
            let eventsJson = await eventsResponse.json()
            let events = getEventsFromJson(eventsJson)
            dispatch(receiveEvents(events))

            // Fetch the events registered by logged user
            let registeredEventsResponse = await fetch(settings.api.getEventsByRegisteredUser(user.id))
            let registeredEventsJson = await registeredEventsResponse.json()
            let registeredEvents = getRegisteredEventsIdsFromJson(registeredEventsJson)
            registeredEvents.forEach(eventId => {
                dispatch({
                    type: types.REGISTER_USER,
                    eventId,
                    userId: user.id
                })
            })
        } catch (error) {
            console.warn('ActionCreators/events::fetchEvents ' + error)
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error
            })
        }
    }
}

export const fetchEventsExp = (user) => {
    return async (dispatch) => {
        dispatch(requestEventsExpired())
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEventsBefore(moment().toDate().getTime()))
            let eventsJson = await eventsResponse.json()
            let events = getEventsFromJson(eventsJson)
            dispatch(receiveEventsExpired(events))

            // Fetch the events registered by logged user
            let registeredEventsResponse = await fetch(settings.api.getEventsByRegisteredUser(user.id))
            let registeredEventsJson = await registeredEventsResponse.json()
            let registeredEvents = getRegisteredEventsIdsFromJson(registeredEventsJson)
            registeredEvents.forEach(eventId => {
                dispatch({
                    type: types.REGISTER_USER,
                    eventId,
                    userId: user.id
                })
            })

        } catch (error) {
            console.warn('ActionCreators/events::fetchEvents ' + error)
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error
            })
        }

    }
}

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
            host: event.host
        })
    }
    return events
}

function getRegisteredEventsIdsFromJson(json) {
    let registeredEvents = []
    for (let i = 0; i < json.length; i++) {
        let event = json[i]
        registeredEvents.push(event.id)
    }
    return registeredEvents
}

export const invalidateEvents = () => ({
    type: types.INVALIDATE_EVENTS,
})

export const receiveEvents = (events) => ({
    type: types.RECEIVE_EVENTS,
    events,
    receivedAt: Date.now()
})

export const receiveEventsExpired = (events) => ({
    type: types.RECEIVE_EVENTS_EXPIRED,
    events
})

export const registerUser = (event, userId) => {
    let eventId = event.id
    return async (dispatch) => {
        dispatch({
            type: types.REGISTER_USER,
            eventId,
            userId,
        })
        PushController.scheduleEventNotifications(event)
        try {
            await fetch(settings.api.addEventParticipant(eventId, userId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.warn('ActionCreators/events::registerUser ' + error)
        }
    }
}

export const requestEventsExpired = () => ({
    type: types.REQUEST_EVENTS_EXPIRED,
})

export const requestEvents = () => ({
    type: types.REQUEST_EVENTS,
})

export const unregisterUser = (event, userId) => {
    let eventId = event.id
    return async (dispatch) => {
        PushController.unscheduleEventNotifications(event);
        dispatch({
            type: types.UNREGISTER_USER,
            eventId,
            userId,
        })
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
}

export const updateEvent = (event) => {
    return async (dispatch) => {
        dispatch({
            type: types.UPDATE_EVENT,
            event
        })
        try {
            await updateEventDb(event)

        } catch (error) {
            console.warn('ActionCreators/events::updatedEvent ' + error)
        }
    }
}


export const deleteEvent = (id) => {
    return async (dispatch) => {
        dispatch({
            type: types.REMOVE_EVENT,
            id
        })
        try {
            await deleteEventDb(id)
        } catch (error) {
            console.warn('ActionCreators/events::deleteEvent ' + error)
        }
    }
}