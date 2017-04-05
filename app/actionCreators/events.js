/**
 * Created by AAB3605 on 03/04/2017.
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

export const toggleParticipation = (id) => ({
    type: 'TOGGLE_PARTICIPATION',
    id
})
