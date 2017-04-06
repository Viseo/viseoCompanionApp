/**
 * Created by AAB3605 on 03/04/2017.
 */
import settings from './../config/settings'

export const types = {
    ADD_EVENT: 'ADD_EVENT',
    ADD_EVENTS: 'ADD_EVENTS',
    FETCH_EVENTS: 'FETCH_EVENTS',
    INVALIDATE_EVENTS: 'INVALIDATE_EVENTS',
    RECEIVE_EVENTS: 'RECEIVE_EVENTS',
    REMOVE_EVENT: 'REMOVE_EVENT',
    REQUEST_EVENTS: 'REQUEST_EVENTS',
    TOGGLE_PARTICIPATION: 'TOGGLE_PARTICIPATION',
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

export const toggleParticipation = (id) => ({
    type: types.TOGGLE_PARTICIPATION,
    id
})

export const fetchEvents = () => {
    return function (dispatch) {
        dispatch(requestEvents())
        return fetch(settings.api.getEvents)
            .then(response => response.json())
            .then(json => {
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
                    });
                }
                dispatch(receiveEvents(events))
            })
            .catch(error => console.warn('ActionCreators/events::fetchEvents ' + error))
    }
}

export const invalidateEvents = () => ({
    type: types.INVALIDATE_EVENTS,
})

export const requestEvents = () => ({
    type: types.REQUEST_EVENTS,
})

export const receiveEvents = (events) => ({
    type: types.RECEIVE_EVENTS,
    events,
    receivedAt: Date.now(),
})