/**
 * Created by VBO3596 on 18/04/2017.
 */
import {types} from './../actionCreators/user'
import {REHYDRATE} from 'redux-persist/constants'

const user = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return Object.assign({}, state, {
                ...action.user
            });
        case types.REMEMBER_USER:
            return Object.assign({}, state, {rememberMe:action.shouldRemember})
        case types.AUTHENTICATION_SUCCESS:
            return Object.assign({}, state, {
                email: action.email,
                password: action.password,
                authenticationStatus: action.code
            })
        case types.AUTHENTICATION_FAILURE:
            return Object.assign({}, state, {
                authenticationStatus: action.code
            })
        case REHYDRATE:
            let incoming = action.payload.user
            if (incoming) return {
                ...state,
                ...incoming,
                authenticationStatus: state.authenticationStatus,
                email: incoming.rememberMe ? incoming.email : '',
                password: incoming.rememberMe ? incoming.password : '',
            }
            return state
        default:
            return state
    }
};

export default user