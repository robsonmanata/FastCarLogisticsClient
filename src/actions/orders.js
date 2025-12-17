import * as api from '../api';

export const getOrders = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchOrders(page);
        dispatch({ type: 'FETCH_ALL_ORDERS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createOrder = (order) => async (dispatch) => {
    try {
        const { data } = await api.createOrder(order);
        dispatch({ type: 'CREATE_ORDER', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateOrder = (id, order) => async (dispatch) => {
    try {
        const { data } = await api.updateOrder(id, order);
        dispatch({ type: 'UPDATE_ORDER', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        await api.deleteOrder(id);
        dispatch({ type: 'DELETE_ORDER', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
