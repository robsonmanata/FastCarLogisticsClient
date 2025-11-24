import * as api from '../api/index';

export const getWarehouses = () => async (dispatch) => {
    try {
        const { data } = await api.getWarehouses();

        dispatch({ type: 'FETCH_ALL_WAREHOUSES', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createWarehouse = (warehouse) => async (dispatch) => {
    try {
        const { data } = await api.createWarehouse(warehouse);

        dispatch({ type: 'CREATE_WAREHOUSE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateWarehouse = (id, warehouse) => async (dispatch) => {
    try {
        const { data } = await api.updateWarehouse(id, warehouse);

        dispatch({ type: 'UPDATE_WAREHOUSE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteWarehouse = (id) => async (dispatch) => {
    try {
        await api.deleteWarehouse(id);

        dispatch({ type: 'DELETE_WAREHOUSE', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
