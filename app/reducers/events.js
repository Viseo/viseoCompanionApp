/**
 * Created by AAB3605 on 29/03/2017.
 */

import {types} from './../actionCreators/events'

const event = (state, action) => {
    switch (action.type) {
        case types.ADD_EVENT:
            return {
                id: action.id,
                name: action.name,
                description: action.description,
                category: action.category,
                keywords: action.keywords,
                location: action.location,
                datetime: action.datetime,
                participating: action.participating,
            }
        default:
            return state
    }
}

const events = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case types.ADD_EVENT:
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    event(undefined, action)
                ]
            })
        case types.ADD_EVENTS:
            let events = action.events.map(e => {
                return event(undefined, {
                    type: types.ADD_EVENT,
                    ...e
                })
            })
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    ...events
                ]
            })
        case types.FETCH_EVENTS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
            })
        case types.INVALIDATE_EVENTS:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case types.RECEIVE_EVENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.events,
                registered: action.registeredEvents,
                lastUpdated: action.receivedAt
            })
        case types.REGISTER_USER:
            let registered = state.registered.slice();
            if(registered.indexOf(action.id) === -1) {
                registered.push(action.id)
            }
            return Object.assign({}, state, {
                registered: registered
            })
        case types.REMOVE_EVENT:
            let eventToRemove = state.items.findIndex(event => {
                return event.id === action.id
            })
            return Object.assign({}, state, {
                items: [
                    ...state.items.slice(0, eventToRemove),
                    ...state.items.slice(eventToRemove + 1)
                ]
            })
        case types.REQUEST_EVENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case types.UNREGISTER_USER:
            return Object.assign({}, state, {
                registered: state.registered.filter(id => {
                    return id !== action.id
                })
            })
        default:
            return state
    }
}

export default events