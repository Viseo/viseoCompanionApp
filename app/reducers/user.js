import {types} from "./../actionCreators/user";

const user = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_USER:
            return {
                ...state,
                ...action.user
            };
        case types.REMEMBER_USER_WHEN_SIGNUP:
            return {
                ...state,
                email: action.email,
                password: action.password,
                rememberMe: true
            };
        case types.AUTHENTICATION_FAILURE:
            return {
                email: state.email,
                authenticationStatus: action.code
            };
        case types.UPDATE_USER_FAILURE:
            return {...state, updateStatus: action.code};
        default:
            return state;
    }
};

export default user