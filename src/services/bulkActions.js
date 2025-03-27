import axios from './axios';

export const bulkActions = {
  // Student bulk actions
  activateStudents: async (studentIds) => {
    return axios.put('/api/students/bulk-activate', studentIds);
  },
  deactivateStudents: async (studentIds) => {
    return axios.put('/api/students/bulk-deactivate', studentIds);
  },

  // Teacher bulk actions
  activateTeachers: async (teacherIds) => {
    return axios.put('/api/teachers/bulk-activate', teacherIds);
  },
  deactivateTeachers: async (teacherIds) => {
    return axios.put('/api/teachers/bulk-deactivate', teacherIds);
  },

  // Course bulk actions
  activateCourses: async (courseIds) => {
    return axios.put('/api/courses/bulk-activate', courseIds);
  },
  deactivateCourses: async (courseIds) => {
    return axios.put('/api/courses/bulk-deactivate', courseIds);
  },
};
