import * as api from '../api';

export const getFinanceStats = (year) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchFinanceStats(year);
        dispatch({ type: 'FETCH_FINANCES', payload: data });
    } catch (error) {
        console.log(error);
    }
};
