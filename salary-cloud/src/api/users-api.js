import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/users'
});

export const createUser = (params) => api.post('/create', params);
export const updateUserById = (id, params) => api.put(`/update/${id}`, params);
export const deleteUserById = (id) => api.put(`/delete/${id}`);
export const getAllUsers = () => api.get('/getAll');
export const getUserById = (id) => api.get(`get/${id}`);

const apis = {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserById
};

export default apis;
