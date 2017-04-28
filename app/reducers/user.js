/**
 * Created by VBO3596 on 18/04/2017.
 */
import {types} from './../actionCreators/user'
const user = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return {...state, updateStatus:action.code}
        case types.UPDATE_USER_FAILURE:
            return {...state, updateStatus:action.code}
        default:
            return state
    }
}

export default user