import settings from "../modules/global/settings";
import {updateComment as updateCommentDb} from "./../util/db";

export const types = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    REQUEST_COMMENTS: 'REQUEST_COMMENTS',
    UPDATE_COMMENT: 'UPDATE_COMMENT'
};

export const requestComments = () => ({
    type: types.REQUEST_COMMENTS,
});
export const receiveComments = (comments) => ({
    type: types.RECEIVE_COMMENTS,
    comments
});

export const getComments = (idEvent) => {
    return async (dispatch) => {
        dispatch(requestComments());
        try {
            // Fetch  comments By Event
            let commentsResponse = await fetch(settings.api.getCommentsByEvent(idEvent));
            let commentsJson = await commentsResponse.json();
            let comments = [];
            for (let i = 0; i < commentsJson.length; i++) {
                let comment = commentsJson[i];
                comments.push({
                    id: comment.id,
                    version: comment.version,
                    content: comment.content,
                    date: comment.datetime,
                    writer: comment.writer,
                    eventId: comment.eventId,
                    children: comment.childComments,
                    nbLike: comment.nbLike,
                    likers: comment.likers,
                });
            }
            dispatch(receiveComments(comments))
        } catch (error) {
            console.warn('ActionCreators/comments::fetchComments ' + error)
        }
    }
};


