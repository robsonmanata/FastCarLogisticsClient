import * as api from '../api';

export const getFinanceStats = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchFinanceStats();
        dispatch({ type: 'FETCH_FINANCES', payload: data });
    } catch (error) {
        console.log(error);
    }
};
