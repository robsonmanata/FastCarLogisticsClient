import * as api from '../api';

export const getTransactions = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTransactions();
        dispatch({ type: 'FETCH_ALL_TRANSACTIONS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
