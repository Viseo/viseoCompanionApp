import {RECEIVE_USER, REQUEST_USER, UPDATE_USER} from './user.actions';

const user = (state = [], action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                ...action.user
            };
        case RECEIVE_USER:
            return {
                ...state,
                isFetching: false,
                otherProfile: action.user,
            };
        case REQUEST_USER:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return state;
    }
};

export default user;