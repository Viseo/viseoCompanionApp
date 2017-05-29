/**
 * Created by IBO3693 on 23/05/2017.
 */
import settings from "../modules/global/settings";

export const types = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    REQUEST_COMMENTS: 'REQUEST_COMMENTS'
}

export const requestComments = () => ({
    type: types.REQUEST_COMMENTS,
})
export const receiveComments = (comments) => ({
    type: types.RECEIVE_COMMENTS,
    comments
})

export const getComments = (idEvent) => {

    return async (dispatch) => {
        dispatch(requestComments())
        try {
            // Fetch  comments By Event
            let commentsResponse = await fetch(settings.api.getCommentsByEvent(idEvent));

            let commentsJson = await commentsResponse.json();
            let comments = []
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
                    likerIds: comment.likers,

                });
            }

            dispatch(receiveComments(comments))


        } catch (error) {
            console.warn('ActionCreators/comments::fetchComments ' + error)

        }

    }


}
