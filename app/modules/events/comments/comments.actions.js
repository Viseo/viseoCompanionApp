import settings from '../../global/settings';

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
            let commentsResponse = await fetch(settings.api.getPublishedCommentsByEvent(eventId));
            let commentsJson = await commentsResponse.json();
            let comments = [];
            for (let i = 0; i < commentsJson.length; i++) {
                comments.push({
                    ...commentsJson[i]
                });
            }
            dispatch(receiveComments(comments));
        } catch (error) {
            console.warn('ActionCreators/comments::fetchComments ' + error);
        }
    };
};


