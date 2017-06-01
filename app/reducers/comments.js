/**
 * Created by IBO3693 on 23/05/2017.
 */
import {types} from "../actionCreators/comments";
const comments = (state = {

                      commentsItems: [],
                      isFetching: false
                  }, action) => {
    switch (action.type) {
        case types.RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                commentsItems: action.comments,
                isFetching: false
            });
        case types.REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.UPDATE_COMMENT:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                    return item.id === action.comment.id?
                        action.comment :
                        item
                })
            });
        default:
            return state
    }
};

export default comments