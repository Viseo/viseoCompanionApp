import {types} from "./../actionCreators/user";
import {REHYDRATE} from "redux-persist/constants";

const user = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return {
                ...state,
                ...action.user
            };
        case types.REMEMBER_USER:
            return {
                ...state,
                rememberMe: action.shouldRemember
            };
        case types.REMEMBER_USER_WHEN_SIGNUP:
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: true
            };
        case types.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                ...action.user,
                email: action.email,
                password: action.password,
                authenticationStatus: action.code,
                isAuthenticated: true,
            };
        case types.AUTHENTICATION_FAILURE:
            return {
                email: state.email,
                authenticationStatus: action.code
            };
        case REHYDRATE:
            let incoming = action.payload.user;
            if (incoming) return {
                ...state,
                ...incoming,
                authenticationStatus: state.authenticationStatus,
                email: incoming.email,
                password: incoming.rememberMe ? incoming.password : ''
            };
            return {...state, updateStatus: action.code};
        case types.UPDATE_USER_FAILURE:
            return {...state, updateStatus: action.code};
        default:
            return state;
    }
};

export default user