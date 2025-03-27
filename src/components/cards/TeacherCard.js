import React from 'react';
import { Card, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const TeacherCard = ({ teacher, onEdit, onDelete }) => (
  <Card
    title={`${teacher.first_name} ${teacher.last_name}`}
    style={{ width: 300 }}
  >
    <p><strong>Email:</strong> {teacher.email}</p>
    <p><strong>Phone:</strong> {teacher.phone}</p>
    <p><strong>Specialization:</strong> {teacher.specialization}</p>
    <p style={{ minHeight: '60px' }}><strong>Bio:</strong> {teacher.bio}</p>
    <p>
      <strong>Status:</strong>{' '}
      <Tag color={teacher.active ? 'green' : 'red'}>
        {teacher.active ? 'ACTIVE' : 'INACTIVE'}
      </Tag>
    </p>
    <Space style={{ marginTop: 16 }}>
      <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(teacher)}>
        Edit Teacher
      </Button>
      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete([teacher.id])}>
        Delete
      </Button>
    </Space>
  </Card>
);
