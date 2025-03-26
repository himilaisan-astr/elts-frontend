import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Button, List, Spin, message } from 'antd';
import { UserOutlined, TeamOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dashboard } from '../services/api';
import HealthCheck from '../components/HealthCheck';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await dashboard.getStats();
      setStats(response.data);
    } catch (error) {
      message.error('Failed to fetch dashboard statistics');
      console.error('Dashboard stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: 'Add New Student', onClick: () => navigate('/students/new'), icon: <UserOutlined /> },
    { title: 'Add New Teacher', onClick: () => navigate('/teachers/new'), icon: <TeamOutlined /> },
    { title: 'Create Course', onClick: () => navigate('/courses/new'), icon: <BookOutlined /> },
    { title: 'View Enrollments', onClick: () => navigate('/enrollments'), icon: <DollarOutlined /> },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <Button type="primary" onClick={() => fetchDashboardStats()}>Refresh Data</Button>
      </Row>
      
      <HealthCheck />
      
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={stats?.total_students || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Teachers"
              value={stats?.total_teachers || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Courses"
              value={stats?.total_courses || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={stats?.revenue_this_month || 0}
              prefix="$"
              precision={2}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card 
            title="Active Enrollments" 
            extra={<Button type="link" onClick={() => navigate('/enrollments')}>View All</Button>}
          >
            <Statistic 
              title="Current Active Enrollments"
              value={stats?.active_enrollments || 0}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="Quick Actions"
            extra={<Button type="link" onClick={() => navigate('/settings')}>Settings</Button>}
          >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={quickActions}
              renderItem={item => (
                <List.Item>
                  <Button 
                    type="default" 
                    icon={item.icon} 
                    onClick={item.onClick}
                    style={{ width: '100%', marginBottom: 8 }}
                  >
                    {item.title}
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
