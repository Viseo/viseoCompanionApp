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
            })
        case types.REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        default:
            return state
    }
}

export default comments