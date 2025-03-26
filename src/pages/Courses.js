import React, { useState } from 'react';
import { Card, Row, Col, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const CourseCard = ({ course }) => (
  <Card
    title={course.name}
    extra={<Button type="link">View Details</Button>}
    style={{ marginBottom: 16 }}
  >
    <p><strong>Instructor:</strong> {course.instructor}</p>
    <p><strong>Schedule:</strong> {course.schedule}</p>
    <p><strong>Students:</strong> {course.enrolledStudents}/{course.maxStudents}</p>
    <p>
      <strong>Status:</strong>{' '}
      <Tag color={course.status === 'active' ? 'green' : 'red'}>
        {course.status.toUpperCase()}
      </Tag>
    </p>
    <Space style={{ marginTop: 16 }}>
      <Button type="primary">Edit Course</Button>
      <Button>Manage Students</Button>
    </Space>
  </Card>
);

const Courses = () => {
  const [searchText, setSearchText] = useState('');

  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      instructor: 'Dr. Jane Smith',
      schedule: 'Mon, Wed 10:00 AM',
      enrolledStudents: 15,
      maxStudents: 20,
      status: 'active',
    },
    {
      id: 2,
      name: 'Physics 101',
      instructor: 'Prof. John Doe',
      schedule: 'Tue, Thu 2:00 PM',
      enrolledStudents: 18,
      maxStudents: 25,
      status: 'active',
    },
    // Add more sample courses as needed
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="Search courses"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Add Course
          </Button>
        </Space>
      </div>

      <Row gutter={16}>
        {courses.map(course => (
          <Col xs={24} sm={24} md={12} lg={8} key={course.id}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Courses;
