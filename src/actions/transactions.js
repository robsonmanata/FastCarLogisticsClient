import * as api from '../api';

export const getTransactions = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchTransactions(page);
        dispatch({ type: 'FETCH_ALL_TRANSACTIONS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
