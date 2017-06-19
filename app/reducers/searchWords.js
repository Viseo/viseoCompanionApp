/**
 * Created by AAB3605 on 05/04/2017.
 */

const searchWords = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORDS':
            return action.searchWords;
        default:
            return state;
    }
};

export default searchWords;