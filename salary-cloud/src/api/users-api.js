import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8000/users'
});

export const createUser = (params) => usersApi.post('/create', params);
export const updateUserEmail = (id, params) => usersApi.put(`/updateEmail${id}`, params);
export const updateUserPassword = (id, params) => usersApi.put(`/updatePassword${id}`, params);
export const updateAnonUser = (params) => usersApi.put(`/updateAnon`, params);
export const deleteUser = (params) => usersApi.put(`/delete`, params);
export const getUserById = (id) => usersApi.get(`/getUser/${id}`);
export const getAnonUser = (params) => usersApi.get(`/getAnon`, params);
export const login = (params) => usersApi.get(`/login`, params);
export const getAllUsers = () => usersApi.get('/getAll');

const apis = {
  createUser,
  updateUserEmail,
  deleteUser,
  getAllUsers,
  getUserById
};

export default apis;
