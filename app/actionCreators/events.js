/**
 * Created by AAB3605 on 03/04/2017.
 */
import settings from './../config/settings'
import {getEventParticipants} from './../util/db'

export const types = {
    ADD_EVENT: 'ADD_EVENT',
    ADD_EVENTS: 'ADD_EVENTS',
    FETCH_EVENTS: 'FETCH_EVENTS',
    FETCH_EVENTS_FAILED: 'FETCH_EVENTS_FAILED',
    GET_EVENT: 'GET_EVENT',
    INVALIDATE_EVENTS: 'INVALIDATE_EVENTS',
    RECEIVE_EVENTS: 'RECEIVE_EVENTS',
    REGISTER_USER: 'REGISTER_USER',
    REMOVE_EVENT: 'REMOVE_EVENT',
    REQUEST_EVENTS: 'REQUEST_EVENTS',
    UNREGISTER_USER: 'UNREGISTER_USER',
    UPDATE_EVENT_PARTICIPANTS: 'UPDATE_EVENT_PARTICIPANTS',
}

let eventCounter = 5;
export const addEvent = (event) => ({
    type: types.ADD_EVENT,
    id: eventCounter++,
    ...event
})

export const fetchEventParticipants = (id) => {
    return async(dispatch) => {
        let participants = await getEventParticipants(id)
        if(participants) {
            participants.map(participant => participant.id)
            dispatch({
                type: types.UPDATE_EVENT_PARTICIPANTS,
                id,
                participants
            })
        }
    }
}

export const fetchEvents = (user) => {
    return async(dispatch) => {
        dispatch(requestEvents())
        try {
            // Fetch all events
            let eventsResponse = await fetch(settings.api.getEvents)
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
            category: event.category
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

export const registerUser = (eventId, userId) => {
    return async(dispatch) => {
        dispatch({
            type: types.REGISTER_USER,
            eventId,
            userId,
        })
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

export const removeEvent = (id) => ({
    type: types.REMOVE_EVENT,
    id
})

export const requestEvents = () => ({
    type: types.REQUEST_EVENTS,
})

export const unregisterUser = (eventId, userId) => {
    return async(dispatch) => {
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
    return async(dispatch) => {
        try {
            console.warn('I need the backend to update ' + event.name + event.location)
        } catch (error) {
            console.warn('ActionCreators/events::updateEvent ' + error)
        }
    }
}