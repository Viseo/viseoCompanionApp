import {getUser as getUserDb} from './../global/db';

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (user) => ({
    type: UPDATE_USER,
    user,
});

export const RECEIVE_USER = 'RECEIVE_USER';
const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user,
});

export const REQUEST_USER = 'REQUEST_USER';
const requestUser = () => ({
    type: REQUEST_USER,
});

export const getUser = (userId) => {
    return async (dispatch) => {
        dispatch(requestUser());
        try {
            let user = await getUserDb(userId);
            dispatch(receiveUser(user));
        } catch (error) {
            console.warn('user.actions::getUser' + error);
        }
    };
};