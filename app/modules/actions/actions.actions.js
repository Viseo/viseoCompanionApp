import * as db from '../global/db';
import {actions} from '../global/db';

export const FETCH_ACTIONS_FAILED = 'FETCH_ACTIONS_FAILED';
export const fetchActions = () => {
    return async (dispatch) => {
        dispatch(requestActions());
        try {
            let actions = await db.actions.getAll();
            dispatch(receiveActions(actions));
        } catch (error) {
            console.warn('actions.actions::fetchActions ' + error);
            dispatch({
                type: FETCH_ACTIONS_FAILED,
                error,
            });
        }
    };
};

export const REQUEST_ACTIONS = 'REQUEST_ACTIONS';
const requestActions = () => ({
    type: REQUEST_ACTIONS,
});

export const RECEIVE_ACTIONS = 'RECEIVE_ACTIONS';
const receiveActions = (events) => ({
    type: RECEIVE_ACTIONS,
    actions,
    receivedAt: Date.now(),
});