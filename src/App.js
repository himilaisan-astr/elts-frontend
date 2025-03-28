import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import AntdThemeProvider from './theme/ThemeProvider';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import AdminLayout from './layouts/AdminLayout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AntdThemeProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AntdThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
