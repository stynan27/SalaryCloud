import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8000/users'
});

export const createUser = (params) => usersApi.post('/create', params);
export const updateUserEmail = (id, params) => usersApi.put(`/updateEmail${id}`, params);
export const updateUserPassword = (id, anonId, params) => usersApi.put(`/updatePassword/${id}/${anonId}`, params);
export const updateAnonUser = (anonId, params) => usersApi.put(`/updateAnon/${anonId}`, params);
export const deleteUser = (id, anonId) => usersApi.delete(`/delete/${id}/${anonId}`);
export const getUserById = (id) => usersApi.get(`/getUser/${id}`);
export const getAnonUser = (anonId) => usersApi.get(`/getAnon/${anonId}`);
export const login = (params) => usersApi.post(`/login`, params);
export const getAllUsers = () => usersApi.get('/getAll');

const apis = {
  createUser,
  updateUserEmail,
  updateUserPassword,
  updateAnonUser,
  deleteUser,
  getUserById,
  getAnonUser,
  login,
  getAllUsers
};

export default apis;
