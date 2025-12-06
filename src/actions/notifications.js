import * as api from '../api';

export const getNotifications = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNotifications();
        dispatch({ type: 'FETCH_NOTIFICATIONS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const markAsRead = (id, userName) => async (dispatch) => {
    try {
        const { data } = await api.markNotificationAsRead(id, { userName });
        dispatch({ type: 'MARK_AS_READ', payload: data });
    } catch (error) {
        console.log(error);
    }
};
