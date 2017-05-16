/**
 * Created by VBO3596 on 18/04/2017.
 */

import {
    authenticate as authenticateDB,
    resetPassword as resetPWD
} from './../util/db'

export const types = {
    UPDATE_USER: 'UPDATE_USER',
    REMEMBER_USER: 'REMEMBER_USER',
    REMEMBER_USER_WHEN_SIGNUP: 'REMEMBER_USER_WHEN_SIGNUP',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'
}

export const rememberUser = (shouldRemember) => ({
    type: types.REMEMBER_USER,
    shouldRemember
})

export const rememberUserWhenSignUp = (email, password) => ({
    type: types.REMEMBER_USER_WHEN_SIGNUP,
    email,
    password
})

export const authenticate = (email, password) => {
    return async (dispatch) => {
        try {
            let response = await authenticateDB(email, password);
            const unabledToReachServerCode = -1;
            const wrongCredentials = null;
            if (response === unabledToReachServerCode) {
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

export const updateUser = (user) => {
    return async (dispatch) => {
        if (user.firstName.length > 0
            || user.lastName.length > 0
            || user.password.length > 0
            || user.password === user.passwordCheck) {
            dispatch({
                type: types.UPDATE_USER_FAILURE,
                code: -1
            })
            return
        }
        try {
            console.warn('I need the backend to update ' + event.name + event.location)
        } catch (error) {
            console.warn('ActionCreators/user::updateUser ' + error)
        }
        dispatch({
            type: types.UPDATE_USER,
            code: 1
        })
    }
}