import * as db from '../../global/db';

export const types = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    REQUEST_COMMENTS: 'REQUEST_COMMENTS',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
};

export const requestComments = () => ({
    type: types.REQUEST_COMMENTS,
});
export const receiveComments = (comments) => ({
    type: types.RECEIVE_COMMENTS,
    comments,
});

export const getComments = (eventId) => {
    return async (dispatch) => {
        dispatch(requestComments());
        try {
            let comments = await db.comments.getByEvent(eventId);
            dispatch(receiveComments(comments));
        } catch (error) {
            console.warn('ActionCreators/comments::fetchComments ' + error);
        }
    };
};


