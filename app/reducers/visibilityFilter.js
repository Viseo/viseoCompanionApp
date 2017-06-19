/**
 * Created by AAB3605 on 29/03/2017.
 */

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        case 'REMOVE_VISIBILITY_FILTER':
            return 'SHOW_ALL';
        default:
            return state;
    }
};

export default visibilityFilter;