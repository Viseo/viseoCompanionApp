/**
 * Created by IBO3693 on 23/05/2017.
 */
import {types} from "../actionCreators/comments";
const comments = (state = {

                      commentsItems: []
                  }, action) => {
    switch (action.type) {
        case types.RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                commentsItems: action.comments
            })
        default:
            return state
    }
}

export default comments