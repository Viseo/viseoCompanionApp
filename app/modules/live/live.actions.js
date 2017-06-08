export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const addChatMessage = (chatMessage) => ({
    type: ADD_CHAT_MESSAGE,
    chatMessage,
});

export const FLUSH_CHAT_MESSAGE = 'FLUSH_CHAT_MESSAGE';
export const flushChatMessage = () => ({
    type: FLUSH_CHAT_MESSAGE
})

