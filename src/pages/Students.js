import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Card, message, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { students as studentsApi } from '../services/api';
import StudentForm from '../components/StudentForm';

const Students = () => {
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await studentsApi.getAll();
      setStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = async (values) => {
    try {
      setLoading(true);
      await studentsApi.create(values);
      message.success('Student created successfully');
      setModalVisible(false);
      fetchStudents(); // Refresh the list
    } catch (error) {
      message.error('Failed to create student');
      console.error('Error creating student:', error);
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
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      filters: [
        { text: 'Beginner', value: 'Beginner' },
        { text: 'Intermediate', value: 'Intermediate' },
        { text: 'Advanced', value: 'Advanced' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link">View</Button>
        </Space>
      ),
    },
  ];

  // Filter students based on search text
  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const data = filteredStudents.map(student => ({
    ...student
  }));

  return (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search students"
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
            Add Student
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <StudentForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleCreateStudent}
        loading={loading}
      />
    </Card>
  );
};

export default Students;
