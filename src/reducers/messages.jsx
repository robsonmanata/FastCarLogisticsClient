const initialState = {
    conversations: [],
    totalUnread: 0,
    currentMessages: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONVERSATIONS':
            return {
                ...state,
                conversations: action.payload.conversations,
                totalUnread: action.payload.totalUnread
            };
        case 'FETCH_MESSAGES':
            return {
                ...state,
                currentMessages: action.payload
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                currentMessages: [...state.currentMessages, action.payload]
            };
        case 'MARK_MESSAGES_READ':
            return {
                ...state,
                currentMessages: state.currentMessages.map(msg =>
                    msg.sender === action.payload ? { ...msg, isRead: true } : msg
                )
            };
        default:
            return state;
    }
};
