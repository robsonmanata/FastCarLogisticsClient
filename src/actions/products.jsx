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

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        console.log('Action: updateProduct called with ID:', id, 'and data:', product);
        const { data } = await api.updateProduct(id, product);
        console.log('Action: updateProduct success, received data:', data);

        dispatch({ type: 'UPDATE_PRODUCT', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);

        dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};
