import axios from 'axios';

const API = axios.create({ baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://fastcarlogistics-c9b44e17fb11.herokuapp' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getCategories = () => API.get('/categories');
export const createCategory = (newCategory) => API.post('/categories', newCategory);
export const updateCategory = (id, updatedCategory) => API.patch(`/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);



export const getUsers = () => API.get('/user');
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const fetchOrders = () => API.get('/orders');
export const createOrder = (newOrder) => API.post('/orders', newOrder);
export const updateOrder = (id, updatedOrder) => API.patch(`/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export const fetchTransactions = () => API.get('/transactions');

export const fetchNotifications = () => API.get('/notifications');
export const markNotificationAsRead = (id, data) => API.patch(`/notifications/${id}/read`, data);




export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
