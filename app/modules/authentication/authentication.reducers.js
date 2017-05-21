import {AUTHENTICATION_SUCCESS} from "./authentication.actions";

export default (state = {}, action) => {
    switch(action.type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loggedUser: {
                    email: action.email,
                }
            };
        default:
            return state;
    }
};