import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Configure axios defaults
axios.defaults.withCredentials = true;  // Enable sending cookies

// Temporary bypass login for development
export const login = async (credentials) => {
  try {
    // Use token endpoint
    const response = await axios.post(`${API_URL}/token`, credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, {
      email: userData.email,
      username: userData.email,  // Using email as username for simplicity
      password: userData.password,
      full_name: userData.fullName || ''
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
