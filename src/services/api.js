import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (credentials) => api.post('/token', credentials),
  register: (userData) => api.post('/users/', userData),
  me: () => api.get('/users/me/'),
};

export const dashboard = {
  getStats: () => api.get('/dashboard/stats/'),
  checkHealth: () => api.get('/health'),
};

export const students = {
  getAll: () => api.get('/students/'),
  create: (data) => api.post('/students/', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

export const teachers = {
  getAll: () => api.get('/teachers/'),
  create: (data) => api.post('/teachers/', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export const courses = {
  getAll: () => api.get('/courses/'),
  create: (data) => api.post('/courses/', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

export const enrollments = {
  getAll: () => api.get('/enrollments/'),
  create: (data) => api.post('/enrollments/', data),
  update: (id, data) => api.put(`/enrollments/${id}`, data),
  delete: (id) => api.delete(`/enrollments/${id}`),
};
