import axios from 'axios';

const url = 'http://localhost:3001';

export const getProducts = () => axios.get(`${url}/products`);
export const createProduct = (newProduct) => axios.post(`${url}/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

export const getCategories = () => axios.get(`${url}/categories`);
export const createCategory = (newCategory) => axios.post(`${url}/categories`, newCategory);
export const updateCategory = (id, updatedCategory) => axios.patch(`${url}/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${url}/categories/${id}`);

export const getWarehouses = () => axios.get(`${url}/warehouses`);
export const createWarehouse = (newWarehouse) => axios.post(`${url}/warehouses`, newWarehouse);
export const updateWarehouse = (id, updatedWarehouse) => axios.patch(`${url}/warehouses/${id}`, updatedWarehouse);
export const deleteWarehouse = (id) => axios.delete(`${url}/warehouses/${id}`);


export const getUsers = () => axios.get(`${url}/user`);
export const createUser = (newUser) => axios.post(`${url}/user`, newUser);
export const updateUser = (id, updatedUser) => axios.patch(`${url}/user/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/user/${id}`);
