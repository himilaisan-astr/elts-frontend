import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';

const Teachers = () => {
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
      title: 'Subjects',
      dataIndex: 'subjects',
      key: 'subjects',
      render: subjects => (
        <>
          {subjects.map(subject => (
            <Tag color="blue" key={subject}>
              {subject}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      sorter: (a, b) => a.experience - b.experience,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
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

  const data = [
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      subjects: ['Mathematics', 'Physics'],
      experience: 5,
      status: 'active',
    },
    // Add more sample data as needed
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search teachers"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<UserAddOutlined />}>
            Add Teacher
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

export default Teachers;
