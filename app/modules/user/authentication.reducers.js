import {AUTHENTICATION_SUCCESS} from "./authentication.actions";
import {REHYDRATE} from "redux-persist/constants";

export default (state = [], action) => {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loggedUser: {
                    email: action.email,
                    password: action.password,
                }
            };
        case REHYDRATE:
            let {authentication} = action.payload;
            if (authentication) return {
                ...state,
                isAuthenticated: false,
                loggedUser: {...authentication.loggedUser},
            };
            return state;
        default:
            return state;
    }
};