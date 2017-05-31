import {ADD_CHAT_MESSAGE} from "./live.actions";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_CHAT_MESSAGE:
            let {chatMessages} = state;
            return {
                ...state,
                chatMessages: [
                    ...chatMessages,
                    action.chatMessage,
                ],
            };
        default:
            return state;
    }
}