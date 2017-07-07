import * as db from '../../global/db';

export const types = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    REQUEST_COMMENTS: 'REQUEST_COMMENTS',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    RECEIVE_RATING: 'RECEIVE_RATING',
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

export const receiveRating = (averageRating, countReviews) => ({
    type: types.RECEIVE_RATING,
    reviewsNumber: countReviews,
    averageRating,
});
export const getRating = (eventId) => {
    return async (dispatch) => {
        try {
            let averageRating = await db.events.getRatingAverage(eventId);
            const countReviews = 2;
            dispatch(receiveRating(averageRating, countReviews));
        } catch (error) {
            console.warn('ActionCreators/comments::fetchComments ' + error);
        }
    };
};


