/**
 * Created by IBO3693 on 23/05/2017.
 */
import settings from "../config/settings";
import {fetch} from "react-native";
export const types = {
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS'
}
export const getComments = (idEvent) => {
    try {
    return async (dispatch) => {
        let comments = await await fetch(settings.api.getComments);
        let commentsJson = await comments.json();

        for (let i = 0; i < commentsJson.length; i++) {
            let comment = commentsJson[i];
            comments.push(new Comment(
                comment.id,
                comment.commentaire,
                comment.userId,
                comment.datetime,
                comment.eventId,

            ));
        }
        dispatch({
            type: types.RECEIVE_COMMENTS,
            idEvent,
            comments
        })
    }

    } catch (error) {
        console.warn('db::getComments ' + error);
    }


}
