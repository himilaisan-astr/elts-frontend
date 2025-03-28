import React, { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout = () => {
  const screens = useBreakpoint();
  const [padding, setPadding] = useState(24);

  useEffect(() => {
    if (screens.xxl) setPadding(32);
    else if (screens.xl) setPadding(24);
    else if (screens.lg) setPadding(16);
    else if (screens.md) setPadding(12);
    else setPadding(8);
  }, [screens]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <Sidebar />
        <Layout style={{ padding }}>
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              background: 'transparent',
              maxWidth: '1600px',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
