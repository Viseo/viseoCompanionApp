import {authenticate as authenticateDb} from '../global/db';

export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const authenticate = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await authenticateDb(email, password);
            const unabledToReachServerCode = -1;
            const wrongCredentials = null;
            if (response === unabledToReachServerCode) {
                dispatch({
                    type: AUTHENTICATION_FAILURE,
                    code: 2
                });
            } else if (response === wrongCredentials) {
                dispatch({
                    type: AUTHENTICATION_FAILURE,
                    code: 3
                });
            } else {
                dispatch({
                    type: AUTHENTICATION_SUCCESS,
                    email,
                    password,
                });
            }
        } catch (error) {
            console.warn('authentication.actionCreators::authenticate ' + error)
        }
    }
}
