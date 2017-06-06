import {authenticate as authenticateDb} from '../../global/db';

export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const authenticate = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await authenticateDb(email, password);
            const wrongCredentials = null;
            if (response === wrongCredentials) {
                dispatch({
                    type: AUTHENTICATION_FAILURE,
                });
            } else {
                dispatch({
                    type: AUTHENTICATION_SUCCESS,
                    email,
                    password,
                });
            }
        } catch (error) {
            console.warn('authentication.actionCreators::authenticate ' + error);
        }
    };
};

export const REMEMBER_USER = 'REMEMBER_USER';
export const rememberUser = (shouldRemember) => ({
    type: REMEMBER_USER,
    shouldRemember,
});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
    type: SIGN_OUT,
});
