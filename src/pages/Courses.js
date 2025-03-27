import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Input, Space, Tag, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { courses as coursesApi, teachers as teachersApi } from '../services/api';
import CourseForm from '../components/CourseForm';

const CourseCard = ({ course }) => (
  <Card
    title={course.name}
    extra={<Button type="link">View Details</Button>}
    style={{ width: 'fit-content'} }
  >
    <p><strong>Description:</strong> {course.description}</p>
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
      <Button type="primary">Edit Course</Button>
      <Button>Manage Students</Button>
    </Space>
  </Card>
);

const Courses = () => {
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await coursesApi.getAll();
      setCourses(response.data);
    } catch (error) {
      message.error('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await teachersApi.getAll();
      setTeachers(response.data);
    } catch (error) {
      message.error('Failed to fetch teachers');
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const handleCreateCourse = async (values) => {
    try {
      setLoading(true);
      await coursesApi.create(values);
      message.success('Course created successfully');
      setModalVisible(false);
      fetchCourses(); // Refresh the list
    } catch (error) {
      message.error('Failed to create course');
      console.error('Error creating course:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search text
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Course
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {filteredCourses.map(course => (
          <Col key={course.id}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      <CourseForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={(values) => {
          // Convert dates to ISO string format
          const formattedValues = {
            ...values,
            start_date: values.start_date.toISOString(),
            end_date: values.end_date.toISOString(),
          };
          handleCreateCourse(formattedValues);
        }}
        loading={loading}
        teachers={teachers.map(teacher => ({
          value: teacher.id,
          label: `${teacher.first_name} ${teacher.last_name}`,
        }))}
      />
    </div>
  );
};

export default Courses;
