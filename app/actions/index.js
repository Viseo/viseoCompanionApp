/**
 * Created by AAB3605 on 29/03/2017.
 */

let eventCounter = 5;
export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    id: eventCounter++,
    ...event
})

export const removeEvent = (id) => ({
    type: 'REMOVE_EVENT',
    id
})

export const openEvent = (id) => ({
    id,
    type: 'OPEN_EVENT'
})

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})
