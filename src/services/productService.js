import axiosInstance from './axiosInstance';

export const getCategories = () => axiosInstance.get('/category');
export const getTaxes = () => axiosInstance.get('/tax');
export const getProducts= (page, limit) => axiosInstance.get(`/product?page=${page}&limit=${limit}`);
export const putProduct = (product, id) => axiosInstance.put(`/product/${id}`, product);
export const postProduct = (product) => axiosInstance.post('/product', product);
export const deleteProduct = (id) => axiosInstance.delete(`/product/${id}`);
