import React from 'react';
import { Layout, Menu, Button, Tooltip } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import '../assets/logo.css';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      logout();
      navigate('/login');
    } else {
      navigate(e.key);
    }
  };

  return (
    <Header 
      className="header" 
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: isDarkMode ? '#001529' : '#ffffff',
        borderBottom: '1px solid #f0f0f0'
      }}>
      <Link to="/dashboard" className="logo">
        <span className="logo-text" style={{ color: isDarkMode ? '#fff' : '#1890ff' }}>ELTS</span>
      </Link>
      <div style={{ marginLeft: 'auto', marginRight: '24px' }}>
        <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <Button 
            type="text" 
            icon={isDarkMode ? <BulbOutlined /> : <BulbFilled />}
            onClick={toggleTheme}
            style={{ color: isDarkMode ? '#fff' : '#000' }}
          />
        </Tooltip>
      </div>
      <Menu
        theme={isDarkMode ? 'dark' : 'light'}
        mode="horizontal"
        onClick={handleMenuClick}
        style={{ 
          background: 'transparent',
          borderBottom: 'none',
          flex: 1,
          minWidth: 0
        }}
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
