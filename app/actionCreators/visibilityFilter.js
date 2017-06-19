export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const setVisibilityFilter = (filter) => ({
    type: SET_VISIBILITY_FILTER,
    filter,
});

export const REMOVE_VISIBILITY_FILTER = 'REMOVE_VISIBILITY_FILTER';
export const removeVisibilityFilter = () => ({
    type: REMOVE_VISIBILITY_FILTER,
});

