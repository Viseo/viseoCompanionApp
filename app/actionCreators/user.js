/**
 * Created by VBO3596 on 18/04/2017.
 */

export const types = {
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE'
}

export const updateUser = (user) => {
    return async (dispatch) => {
        if (user.firstName.length > 0
            || user.lastName.length > 0
            || user.password.length > 0
            || user.password === user.passwordCheck) {
            dispatch({
                type: types.UPDATE_USER_FAILURE,
                code:-1
            })
            return
        }
        try {
            // console.warn('I need the backend to update ' + event.name + event.location)
        } catch (error) {
            console.warn('ActionCreators/user::updateUser ' + error)
        }
        dispatch({
            type: types.UPDATE_USER,
            code:1
        })
    }
}