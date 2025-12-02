import * as api from '../api/index';

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: 'FETCH_ALL_USERS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);
        dispatch({ type: 'CREATE_USER', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: 'UPDATE_USER', payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Something went wrong during sign in.");
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', data });

        navigate('/dashboard');
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Something went wrong during sign up.");
    }
};
