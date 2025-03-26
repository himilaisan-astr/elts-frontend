import React, { useState } from 'react';
import { Table, Button, Input, Space, Card } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';

const Students = () => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      filters: [
        { text: 'Mathematics', value: 'Mathematics' },
        { text: 'Science', value: 'Science' },
        { text: 'English', value: 'English' },
      ],
      onFilter: (value, record) => record.course.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
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

  const data = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      course: 'Mathematics',
      status: 'active',
    },
    // Add more sample data as needed
  ];

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
          <Button type="primary" icon={<UserAddOutlined />}>
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
    </Card>
  );
};

export default Students;
