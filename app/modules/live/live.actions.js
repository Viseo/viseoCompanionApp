export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const addChatMessage = (chatMessage) => ({
    type: ADD_CHAT_MESSAGE,
    chatMessage,
    lastUpdate: chatMessage.datetime,
});
