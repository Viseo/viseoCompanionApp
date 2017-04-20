/**
 * Created by VBO3596 on 18/04/2017.
 */
import {types} from './../actionCreators/user'
const user = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return state
        default:
            return state
    }
}

export default user