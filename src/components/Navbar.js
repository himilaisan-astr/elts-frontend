import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../assets/logo.css';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      logout();
      navigate('/login');
    } else {
      navigate(e.key);
    }
  };

  return (
    <Header className="header">
      <Link to="/dashboard" className="logo">
        <span className="logo-text">ELTS</span>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleMenuClick}
        items={[
          {
            key: '/dashboard',
            label: 'Dashboard',
          },
          {
            key: '/students',
            label: 'Students',
          },
          {
            key: '/teachers',
            label: 'Teachers',
          },
          {
            key: '/courses',
            label: 'Courses',
          },
          {
            key: '/settings',
            label: 'Settings',
          },
          {
            key: 'logout',
            label: 'Logout',
            style: { marginLeft: 'auto' },
          },
        ]}
      />
    </Header>
  );
};

export default Navbar;
