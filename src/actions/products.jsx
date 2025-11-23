import * as api from '../api/index';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.getProducts();

        dispatch({ type: 'FETCH_ALL_Products', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: 'CREATE_Product', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};