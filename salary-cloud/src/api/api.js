import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/users'
});

export const createUser = (params) => api.post('/createUser', params);
export const updateUserById = (id, params) => api.put(`/updateUser/${id}`, params);
export const deleteUserById = (id) => api.put(`/deleteUser/${id}`);
export const getAllUsers = () => api.get('/getUsers');
export const getUserById = (id) => api.get(`getUser/${id}`);

const apis = {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserById
};

export default apis;
