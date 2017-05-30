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
            let incoming = action.payload.authentication;
            if (incoming) return {
                ...state,
                isAuthenticated: false,
                loggedUser: {},
                savedUser: {...incoming.savedUser},
            };
            return state;
        default:
            return state;
    }
};