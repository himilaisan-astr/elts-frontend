import React from 'react';
import { Card, Button, Space, Tag } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

export const CourseCard = ({ course, onEdit, onDelete, onManageStudents, onViewDetails }) => (
  <Card
    title={course.name}
    extra={<Button type="link" onClick={() => onViewDetails(course)}>View Details</Button>}
    style={{ width: 500 }} // make sure to make this dynamic later
  >
    <p style={{ minHeight: '80px' }}><strong>Description:</strong> {course.description}</p>
    <p><strong>Level:</strong> {course.level}</p>
    <p><strong>Capacity:</strong> {course.max_students}</p>
    <p><strong>Price:</strong> ${course.price.toFixed(2)}</p>
    <p><strong>Duration:</strong> {new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}</p>
    <p>
      <strong>Status:</strong>{' '}
      <Tag color={course.active ? 'green' : 'red'}>
        {course.active ? 'ACTIVE' : 'INACTIVE'}
      </Tag>
    </p>
    <Space style={{ marginTop: 16 }}>
      <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(course)}>Edit Course</Button>
      <Button icon={<EyeOutlined />} onClick={() => onManageStudents(course)}>Manage Students</Button>
      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete([course.id])}>Delete</Button>
    </Space>
  </Card>
);