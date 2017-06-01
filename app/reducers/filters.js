/**
 * Created by AAB3605 on 04/04/2017.
 */

const deepEqual = (first, second) => {
    for (let key in first) {
        if (!second.hasOwnProperty(key))
            return false;
        if (first[key] !== second[key])
            return false
    }
    return true
};

const filters = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FILTER':
            let filterIndex = state.findIndex((element) => {
                return deepEqual(action.filter, element)
            });
            if (filterIndex === -1) {
                state = state.slice();
                state.push(action.filter)
            }
            return state;
        case 'REMOVE_FILTER':
            let filterToRemove = state.findIndex((element) => {
                return deepEqual(action.filter, element)
            });
            return filterToRemove === -1 ?
                state :
                [
                    ...state.slice(0, filterToRemove),
                    ...state.slice(filterToRemove + 1)
                ];
        default:
            return state
    }
};

export default filters