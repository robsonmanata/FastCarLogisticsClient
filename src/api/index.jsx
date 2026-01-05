import axios from 'axios';

const API = axios.create({ baseURL: window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://fastcarlogistics-c9b44e17fb11.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const getProducts = (page) => API.get(`/products?page=${page}`);
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

export const fetchOrders = (page) => API.get(`/orders?page=${page}`);
export const createOrder = (newOrder) => API.post('/orders', newOrder);
export const updateOrder = (id, updatedOrder) => API.patch(`/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export const fetchDashboardStats = (year) => API.get(`/dashboard${year ? `?year=${year}` : ''}`);
export const fetchFinanceStats = (year) => API.get(`/finances/stats${year ? `?year=${year}` : ''}`);

export const fetchTransactions = (page) => API.get(`/transactions?page=${page}`);

export const fetchNotifications = (page) => API.get(`/notifications?page=${page}`);
export const markNotificationAsRead = (id, data) => API.patch(`/notifications/${id}/read`, data);




export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
