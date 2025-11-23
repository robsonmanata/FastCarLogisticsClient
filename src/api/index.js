import axios from 'axios';

const url = 'http://localhost:3001';

export const getProducts = () => axios.get(`${url}/products`);
export const createProduct = (newProduct) => axios.post(`${url}/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.put(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

export const getCategories = () => axios.get(`${url}/categories`);
export const createCategory = (newCategory) => axios.post(`${url}/categories`, newCategory);
export const updateCategory = (id, updatedCategory) => axios.put(`${url}/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${url}/categories/${id}`);

export const getWarehouses = () => axios.get(`${url}/warehouses`);
export const createWarehouse = (newWarehouse) => axios.post(`${url}/warehouses`, newWarehouse);
export const updateWarehouse = (id, updatedWarehouse) => axios.put(`${url}/warehouses/${id}`, updatedWarehouse);
export const deleteWarehouse = (id) => axios.delete(`${url}/warehouses/${id}`);

