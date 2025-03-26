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
  getStats: () => api.get('/api/dashboard/stats/'),
};

export const students = {
  getAll: () => api.get('/api/students/'),
  create: (data) => api.post('/api/students/', data),
  update: (id, data) => api.put(`/api/students/${id}`, data),
  delete: (id) => api.delete(`/api/students/${id}`),
};

export const teachers = {
  getAll: () => api.get('/api/teachers/'),
  create: (data) => api.post('/api/teachers/', data),
  update: (id, data) => api.put(`/api/teachers/${id}`, data),
  delete: (id) => api.delete(`/api/teachers/${id}`),
};

export const courses = {
  getAll: () => api.get('/api/courses/'),
  create: (data) => api.post('/api/courses/', data),
  update: (id, data) => api.put(`/api/courses/${id}`, data),
  delete: (id) => api.delete(`/api/courses/${id}`),
};

export const enrollments = {
  getAll: () => api.get('/api/enrollments/'),
  create: (data) => api.post('/api/enrollments/', data),
  update: (id, data) => api.put(`/api/enrollments/${id}`, data),
  delete: (id) => api.delete(`/api/enrollments/${id}`),
};
