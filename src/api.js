// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // Default header for all requests
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Accessing the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adding the token to the Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getTasks = async () => {
  const response = await api.get('/tasks/me');
  return response.data;
};
export const getImportantTasks = async (text1) => {
  const response = await api.get(`/tasks/${text1}`);
  return response.data;
};
export const getSingleTasks = async (id) => {
  const response = await api.get(`/tasks/sigle/${id}`);
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};
export const updateTask = async (id, taskData) => { // Add 'taskData' parameter
  const response = await api.patch(`/tasks/${id}`, taskData);
  return response.data;
};
export const addTask = async ( taskData) => { // Add 'taskData' parameter
  const response = await api.post(`/task`, taskData);
  return response.data;
};


export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export default api;
