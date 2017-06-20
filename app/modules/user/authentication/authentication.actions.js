import * as db from '../../global/db';
import {UPDATE_USER} from '../user.actions';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const authenticate = (email, password) => {
    return async (dispatch) => {
        dispatch(requestAuthentication());
        try {
            let response = await db.users.authenticate(email, password);
            const wrongCredentials = null;
            if (response !== wrongCredentials) {
                dispatch({
                    type: AUTHENTICATION_SUCCESS,
                    email,
                    password,
                });
                dispatch({
                    type: UPDATE_USER,
                    user: {
                        ...response,
                        email,
                        password,
                    },
                });
            }
        } catch (error) {
            console.warn('authentication.actionCreators::authenticate ' + error);
        }
        dispatch(receiveAuthentication());
    };
};

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
const requestAuthentication = () => ({
    type: REQUEST_AUTHENTICATION,
});

export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';
const receiveAuthentication = () => ({
    type: RECEIVE_AUTHENTICATION,
});

export const REMEMBER_USER = 'REMEMBER_USER';
export const rememberUser = (shouldRemember) => ({
    type: REMEMBER_USER,
    shouldRemember,
});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
    type: SIGN_OUT,
});
