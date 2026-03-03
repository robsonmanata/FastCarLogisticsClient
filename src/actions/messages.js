import * as api from '../api';

export const getConversations = () => async (dispatch) => {
    try {
        const { data } = await api.fetchConversations();
        dispatch({ type: 'FETCH_CONVERSATIONS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getMessages = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchMessages(userId);
        dispatch({ type: 'FETCH_MESSAGES', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const sendMessage = (messageData) => async (dispatch) => {
    try {
        const { data } = await api.sendMessage(messageData);
        dispatch({ type: 'SEND_MESSAGE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const markMessagesAsRead = (userId) => async (dispatch) => {
    try {
        await api.markMessagesAsRead(userId);
        dispatch({ type: 'MARK_MESSAGES_READ', payload: userId });
        dispatch(getConversations()); // Refresh counts
    } catch (error) {
        console.log(error.message);
    }
};
