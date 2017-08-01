import * as types from './actions.actions';

function formatAction(action) {
    return {
        ...action,
        id: parseInt(action.id),
        version: parseInt(action.version),
        minGain: parseInt(action.minGain),
        maxGain: parseInt(action.maxGain),
    };
}

const actions = (state = {
    items: [],
}, action) => {
    switch (action.type) {
        case types.REQUEST_ACTIONS:
            return {
                ...state,
                items: action.actions,
            };
        default:
            return state;
    }
};