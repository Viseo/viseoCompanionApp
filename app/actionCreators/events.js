/**
 * Created by AAB3605 on 03/04/2017.
 */
import settings from './../config/settings'

export const types = {
    ADD_EVENT: 'ADD_EVENT',
    ADD_EVENTS: 'ADD_EVENTS',
    FETCH_EVENTS: 'FETCH_EVENTS',
    FETCH_EVENTS_FAILED: 'FETCH_EVENTS_FAILED',
    INVALIDATE_EVENTS: 'INVALIDATE_EVENTS',
    RECEIVE_EVENTS: 'RECEIVE_EVENTS',
    REGISTER_USER: 'REGISTER_USER',
    REMOVE_EVENT: 'REMOVE_EVENT',
    REQUEST_EVENTS: 'REQUEST_EVENTS',
    UNREGISTER_USER: 'UNREGISTER_USER',
}

let eventCounter = 5;
export const addEvent = (event) => ({
    type: types.ADD_EVENT,
    id: eventCounter++,
    ...event
})

export const removeEvent = (id) => ({
    type: types.REMOVE_EVENT,
    id
})

export const registerUser = (eventId, userId) => {
    return async(dispatch) => {
        dispatch({
            type: types.REGISTER_USER,
            id: eventId
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

export const unregisterUser = (eventId, userId) => {
    return async(dispatch) => {
        dispatch({
            type: types.UNREGISTER_USER,
            id: eventId
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

function getEventsFromJson(json) {
    let events = [];
    for (let i = 0; i < json.length; i++) {
        let event = json[i];
        events.push({
            id: event.id,
            name: event.name,
            description: event.description,
            datetime: event.datetime,
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

export const fetchEvents = (user) => {
    return async(dispatch) => {
        dispatch(requestEvents())
        try {
            let eventsResponse = await fetch(settings.api.getEvents)
            let eventsJson = await eventsResponse.json()
            let events = getEventsFromJson(eventsJson)
            let registeredEventsResponse = await fetch(settings.api.getEventsByRegisteredUser(user.id))
            let registeredEventsJson = await registeredEventsResponse.json()
            let registeredEvents = getRegisteredEventsIdsFromJson(registeredEventsJson)
            dispatch(receiveEvents(events, registeredEvents))
        } catch (error) {
            console.warn('ActionCreators/events::fetchEvents ' + error)
            dispatch({
                type: types.FETCH_EVENTS_FAILED,
                error
            })
        }
    }
}

export const invalidateEvents = () => ({
    type: types.INVALIDATE_EVENTS,
})

export const requestEvents = () => ({
    type: types.REQUEST_EVENTS,
})

export const receiveEvents = (events, registeredEvents) => ({
    type: types.RECEIVE_EVENTS,
    events,
    registeredEvents,
    receivedAt: Date.now()
})
