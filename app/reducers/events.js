/**
 * Created by AAB3605 on 29/03/2017.
 */

const event = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
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

const events = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return [
                ...state,
                event(undefined, action)
            ]
        case 'ADD_EVENTS':
            let events = action.events.map(e => {
                return event(undefined, {
                    type: 'ADD_EVENT',
                    ...e
                })
            })
            return [
                ...state,
                ...events
            ]
        case 'REMOVE_EVENT':
            let eventToRemove = state.findIndex(event => {
                return event.id === action.id
            })
            return [
                ...state.slice(0, eventToRemove),
                ...state.slice(eventToRemove + 1)
            ]
        case 'TOGGLE_PARTICIPATION':
            return state.map(event => {
                return event.id === action.id ?
                    {
                        ...event,
                        participating: !event.participating
                    } :
                    event
            })
        default:
            return state
    }
}

export default events