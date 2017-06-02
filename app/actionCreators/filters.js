/**
 * Created by AAB3605 on 04/04/2017.
 */

export const addFilter = (filter) => ({
    type: 'ADD_FILTER',
    filter
});

export const removeFilter = (filter) => ({
    type: 'REMOVE_FILTER',
    filter
});
