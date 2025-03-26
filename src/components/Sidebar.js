import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/students',
      icon: <UserOutlined />,
      label: 'Students',
    },
    {
      key: '/teachers',
      icon: <TeamOutlined />,
      label: 'Teachers',
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: 'Courses',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        onClick={({ key }) => navigate(key)}
      >
        {menuItems.map(item => {
          const isExact = location.pathname === item.key;
          return (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              className={isExact ? 'ant-menu-item-selected' : ''}
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
