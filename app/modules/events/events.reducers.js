import {types} from "../../actionCreators/events.depreciated";
import {
    ADD_EVENT,
    FETCH_EVENTS_FAILED,
    RECEIVE_EVENTS,
    REGISTER_USER,
    REQUEST_EVENTS,
    UNREGISTER_USER,
    UPDATE_EVENT,
    RECEIVE_EVENTS_REVIEWED,
} from "./events.actions";

function formatEvent(event) {
    return {
        ...event,
        category: parseInt(event.category),
        datetime: parseInt(event.datetime),
        id: parseInt(event.id),
        version: parseInt(event.version),
        host: {
            ...event.host,
            id: parseInt(event.host.id),
            version: parseInt(event.host.version),
        },
    };
}

const events = (state = {
                    isFetching: false,
                    didInvalidate: false,
                    items: [],
                    itemsExpired: [],
                    itemsReviewed: [],
                }, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return {
                ...state,
                items: [
                    ...state.items,
                    formatEvent(action.event),
                ],
            };
        case FETCH_EVENTS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case types.INVALIDATE_EVENTS:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case RECEIVE_EVENTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.events.map(event => formatEvent(event)),
                lastUpdated: action.receivedAt,
            };
        case types.RECEIVE_EVENTS_EXPIRED:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                itemsExpired: action.events,
            });
        case types.RECEIVE_EVENTS_REVIEWED:
            return Object.assign({}, state, {
                itemsReviewed: action.events,
            });
        case REGISTER_USER: {
            let eventToRegisterFor = state.items.find(event => event.id === action.eventId);
            if (!eventToRegisterFor) {
                return state;
            }
            let participants = eventToRegisterFor.participants || [];
            let isAlreadyRegistered = participants.indexOf(action.userId) !== -1;
            if (!isAlreadyRegistered) {
                participants = participants.slice();
                participants.push(action.userId);
            }
            eventToRegisterFor.participants = participants;
            return Object.assign({}, state, {
                items: state.items.map(event => {
                    return event.id === action.eventId ?
                        eventToRegisterFor :
                        event;
                }),
            });
        }
        case types.REMOVE_EVENT: {
            let eventToRemove = state.items.findIndex(event => {
                return event.id === action.id;
            });
            return Object.assign({}, state, {
                items: [
                    ...state.items.slice(0, eventToRemove),
                    ...state.items.slice(eventToRemove + 1)
                ],
            });
        }
        case REQUEST_EVENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case types.REQUEST_EVENTS_EXPIRED:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case types.REQUEST_EVENTS_REVIEWED:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case UNREGISTER_USER: {
            let eventToUnregisterFrom = state.items.find(event => event.id === action.eventId);
            if (!eventToUnregisterFrom) {
                return state;
            }
            let participants = eventToUnregisterFrom.hasOwnProperty("participants") ?
                eventToUnregisterFrom.participants :
                [];
            let participantIndex = participants.indexOf(action.userId);
            if (participantIndex !== -1) {
                participants = [
                    ...participants.slice(0, participantIndex),
                    ...participants.slice(participantIndex + 1)
                ];
            }
            return Object.assign({}, state, {
                items: state.items.map(event => {
                    return event.id === action.eventId ?
                        {
                            ...event,
                            participants,
                        } :
                        event;
                }),
            });
        }
        case UPDATE_EVENT:
            return {
                ...state,
                items: state.items.map(event => {
                    return parseInt(event.id) === parseInt(action.event.id) ?
                        action.event :
                        event;
                }),
            };
        default:
            return state;
    }
};

export default events;