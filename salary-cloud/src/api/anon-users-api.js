import axios from 'axios';

const usersApi = axios.create({
  baseURL: 'http://localhost:8000/anon-users'
});

export const createAnonUser = (params) => usersApi.post('/create', params);
export const updateAnonUserById = (id, params) => usersApi.put(`/update/${id}`, params);
export const deleteAnonUserById = (id) => usersApi.put(`/delete/${id}`);
export const getAllAnonUsers = () => usersApi.get('/getAll');
export const getAnonUserById = (id) => usersApi.get(`get/${id}`);

const apis = {
    createAnonUser,
    updateAnonUserById,
    deleteAnonUserById,
    getAllAnonUsers,
    getAnonUserById
};

export default apis;