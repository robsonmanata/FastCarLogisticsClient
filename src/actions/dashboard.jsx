import * as api from '../api';

export const getDashboardStats = (year) => async (dispatch) => {
    try {
        const { data } = await api.fetchDashboardStats(year);
        dispatch({ type: 'FETCH_DASHBOARD_STATS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};
