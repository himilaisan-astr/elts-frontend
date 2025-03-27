import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Input, Space, Tag, message } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { teachers as teachersApi } from '../services/api';
import TeacherForm from '../components/TeacherForm';

const Teachers = () => {
  const [searchText, setSearchText] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTeachers = async () => {
    try {
      const response = await teachersApi.getAll();
      console.log(response.data)
      setTeachers(response.data);
    } catch (error) {
      message.error('Failed to fetch teachers');
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleCreateTeacher = async (values) => {
    try {
      setLoading(true);
      await teachersApi.create(values);
      message.success('Teacher created successfully');
      setModalVisible(false);
      fetchTeachers(); // Refresh the list
    } catch (error) {
      message.error('Failed to create teacher');
      console.error('Error creating teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
      sorter: (a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
      render: specialization => (
        <Tag color="blue">{specialization}</Tag>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      render: active => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link">View Schedule</Button>
        </Space>
      ),
    },
  ];

  // Filter teachers based on search text
  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card style={{ width: '100%', overflow: 'auto'}}>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search teachers"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button 
            type="primary" 
            icon={<UserAddOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Teacher
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={filteredTeachers}
        rowKey="id"
        pagination={{
          total: filteredTeachers.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <TeacherForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleCreateTeacher}
        loading={loading}
      />
    </Card>
  );
};

export default Teachers;
