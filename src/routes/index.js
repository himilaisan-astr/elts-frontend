import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Import pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Teachers from '../pages/Teachers';
import Courses from '../pages/Courses';
import Enrollments from '../pages/Enrollments';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        <Route path="students">
          <Route index element={<Students />} />
        </Route>
        
        <Route path="teachers">
          <Route index element={<Teachers />} />
        </Route>
        
        <Route path="courses">
          <Route index element={<Courses />} />
        </Route>
        
        <Route path="enrollments">
          <Route index element={<Enrollments />} />
        </Route>
        
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
