import {types} from './comments.actions';

const comments = (state = {
    items: [],
    isFetching: false,
}, action) => {
    switch (action.type) {
        case types.RECEIVE_COMMENTS:
            return {
                ...state,
                items: action.comments,
                isFetching: false,
            };
        case types.REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case types.UPDATE_COMMENT:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                    return item.id === action.comment.id ?
                        action.comment :
                        item;
                }),
            });
        case types.RECEIVE_RATING:
            return Object.assign({}, state, {
                reviewsNumber: action.reviewsNumber,
                averageRating: action.averageRating,
            });
        default:
            return state;
    }
};

export default comments;