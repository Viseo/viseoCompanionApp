/**
 * Created by VBO3596 on 18/04/2017.
 */

export const types = {
    UPDATE_USER: 'UPDATE_USER'
}

export const updateUser = (user) => ({
    type: types.UPDATE_USER,
    user
})