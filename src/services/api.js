import axios from 'axios';

export const api = axios.create({
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

export const authApi = {
  login: (credentials) => api.post('/token', credentials),
  register: (userData) => api.post('/users/', userData),
  me: () => api.get('/users/me/'),
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats/'),
  checkHealth: () => api.get('/health'),
};

export const studentsApi = {
  getAll: () => api.get('/students/'),
  create: (data) => api.post('/students/', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

export const teachersApi = {
  getAll: () => api.get('/teachers/'),
  create: (data) => api.post('/teachers/', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export const coursesApi = {
  getAll: () => api.get('/courses/'),
  create: (data) => api.post('/courses/', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  getStudents: (id) => api.get(`/courses/${id}/students`),
};

export const enrollmentsApi = {
  getAll: () => api.get('/enrollments/'),
  create: (data) => api.post('/enrollments/', data),
  update: (id, data) => api.put(`/enrollments/${id}`, data),
  delete: (id) => api.delete(`/enrollments/${id}`),
};

export const bulkActions = {
  // Student bulk actions
  activateStudents: async (studentIds) => {
    return api.put('/students/bulk-activate', studentIds);
  },
  deactivateStudents: async (studentIds) => {
    return api.put('/students/bulk-deactivate', studentIds);
  },
  deleteStudents: async (studentIds) => {
    return api.delete('/students/bulk-delete', { data: studentIds });
  },

  // Teacher bulk actions
  activateTeachers: async (teacherIds) => {
    return api.put('/teachers/bulk-activate', teacherIds);
  },
  deactivateTeachers: async (teacherIds) => {
    return api.put('/teachers/bulk-deactivate', teacherIds);
  },
  deleteTeachers: async (teacherIds) => {
    return api.delete('/teachers/bulk-delete', { data: teacherIds });
  },

  // Course bulk actions
  activateCourses: async (courseIds) => {
    return api.put('/courses/bulk-activate', courseIds);
  },
  deactivateCourses: async (courseIds) => {
    return api.put('/courses/bulk-deactivate', courseIds);
  },
  deleteCourses: async (courseIds) => {
    return api.delete('/courses/bulk-delete', { data: courseIds });
  },
};
