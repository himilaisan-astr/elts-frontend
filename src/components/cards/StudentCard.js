import React from 'react';
import { Card, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const StudentCard = ({ student, onEdit, onDelete }) => (
  <Card
    title={`${student.first_name} ${student.last_name}`}
    style={{ width: 300 }}
  >
    <p><strong>Email:</strong> {student.email}</p>
    <p><strong>Phone:</strong> {student.phone}</p>
    <p><strong>Level:</strong> {student.level}</p>
    <p>
      <strong>Status:</strong>{' '}
      <Tag color={student.active ? 'green' : 'red'}>
        {student.active ? 'ACTIVE' : 'INACTIVE'}
      </Tag>
    </p>
    <Space style={{ marginTop: 16 }}>
      <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(student)}>
        Edit Student
      </Button>
      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete([student.id])}>
        Delete
      </Button>
    </Space>
  </Card>
);
