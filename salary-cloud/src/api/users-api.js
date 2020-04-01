import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8000/users'
});

export const createUser = (params) => usersApi.post('/create', params);
export const updateUserById = (id, params) => usersApi.put(`/update/${id}`, params);
export const deleteUserById = (id) => usersApi.put(`/delete/${id}`);
export const getAllUsers = () => usersApi.get('/getAll');
export const getUserById = (id) => usersApi.get(`get/${id}`);

const apis = {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserById
};

export default apis;
