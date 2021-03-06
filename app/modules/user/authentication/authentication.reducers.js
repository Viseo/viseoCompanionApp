import {
    AUTHENTICATION_SUCCESS,
    RECEIVE_AUTHENTICATION,
    REMEMBER_USER,
    REQUEST_AUTHENTICATION,
    SIGN_OUT
} from './authentication.actions';
import {REHYDRATE} from 'redux-persist/constants';

export default (state = [], action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loggedUser: {
                    firstName: action.firstName,
                    email: action.email,
                    password: action.password,
                },
            };
        case REQUEST_AUTHENTICATION:
            return {
                ...state,
                isAuthenticating: true,
            };
        case RECEIVE_AUTHENTICATION:
            return {
                ...state,
                isAuthenticating: false,
            };
        case REHYDRATE:
            let {authentication} = action.payload;
            if (!authentication) {
                return state;
            }
            let loggedUser = authentication.rememberUser ?
                authentication.loggedUser :
                {
                    email: '',
                    password: '',
                };
            if (authentication) return {
                ...state,
                isAuthenticated: false,
                loggedUser,
            };
            return state;
        case REMEMBER_USER:
            return {
                ...state,
                rememberUser: action.shouldRemember,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                loggedUser: {
                    email: '',
                    password: '',
                },
            };
        default:
            return state;
    }
};