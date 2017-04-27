/**
 * Created by VBO3596 on 18/04/2017.
 */

import {authenticate as authenticateDB} from './../util/db'

export const types = {
    UPDATE_USER: 'UPDATE_USER',
    REMEMBER_USER: 'REMEMBER_USER',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE'
}

export const updateUser = (user) => ({
    type: types.UPDATE_USER,
    user
})

export const rememberUser = (shouldRemember) => ({
    type: types.REMEMBER_USER,
    shouldRemember
})

export const authenticate = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await authenticateDB(email, password);
            const unabledToReachServerCode = -1;
            const wrongCredentials = null;
            if (response == unabledToReachServerCode) {
                dispatch({
                    type: types.AUTHENTICATION_FAILURE,
                    code: 2
                })
            } else if (response === wrongCredentials) {
                dispatch({
                    type: types.AUTHENTICATION_FAILURE,
                    code: 3
                })
            } else {
                dispatch({
                    type: types.AUTHENTICATION_SUCCESS,
                    email,
                    password,
                    code: 1
                })
            }

        } catch (error) {
            console.warn('ActionCreators/user::authenticate ' + error)
        }
    }
}