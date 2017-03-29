/**
 * Created by AAB3605 on 29/03/2017.
 */

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const openEvent = (id) => ({
    id,
    type: 'OPEN_EVENT'
});