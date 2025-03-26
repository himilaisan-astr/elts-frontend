import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/api';
import { message } from 'antd';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await auth.me();
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await auth.login(credentials);
      localStorage.setItem('token', response.data.access_token);
      await checkAuth();
      message.success('Successfully logged in!');
      return true;
    } catch (error) {
      message.error(error.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      message.success('Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Failed to logout');
    }
  };

  const register = async (userData) => {
    try {
      await auth.register(userData);
      message.success('Registration successful! Please login.');
      return true;
    } catch (error) {
      message.error(error.response?.data?.detail || 'Registration failed');
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};