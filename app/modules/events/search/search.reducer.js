import {SET_WORDS} from './search.actions';

const searchWords = (state = [], action) => {
    switch (action.type) {
        case SET_WORDS:
            return action.searchWords;
        default:
            return state;
    }
};

export default searchWords;