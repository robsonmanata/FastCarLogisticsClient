export default (notifications = [], action) => {
    switch (action.type) {
        case 'FETCH_NOTIFICATIONS':
            return action.payload;
        case 'MARK_AS_READ':
            return notifications.map((notification) => notification._id === action.payload._id ? action.payload : notification);
        case 'CREATE_NOTIFICATION': // In case we want to push real-time later
            return [action.payload, ...notifications];
        default:
            return notifications;
    }
};
