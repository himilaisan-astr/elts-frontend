import { message } from 'antd';
import { coursesApi, teachersApi, studentsApi } from './api';

export const fetchCourses = async (setCourses) => {
  try {
    const response = await coursesApi.getAll();
    setCourses(response.data);
  } catch (error) {
    message.error('Failed to fetch courses');
  }
};

export const fetchTeachers = async (setTeachers) => {
  try {
    const response = await teachersApi.getAll();
    setTeachers(response.data);
  } catch (error) {
    message.error('Failed to fetch teachers');
  }
};

export const fetchStudents = async (setStudents) => {
  try {
    const response = await studentsApi.getAll();
    setStudents(response.data);
  } catch (error) {
    message.error('Failed to fetch students');
  }
};