import React, { useState, useEffect } from 'react';
import { enrollmentsApi, studentsApi, coursesApi } from '../services/api';
import { Table, Card, Button, Tag, message, Modal, Form, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

const Enrollments = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentsApi.getAll();
      setEnrollments(response.data);
    } catch (error) {
      message.error(error.message || 'Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentsApi.getAll();
      setStudents(response.data);
    } catch (error) {
      message.error(error.message || 'Failed to fetch students');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await coursesApi.getAll();
      setCourses(response.data);
    } catch (error) {
      message.error(error.message || 'Failed to fetch courses');
    }
  };

  const handleNewEnrollment = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      const formattedData = {
        ...values,
        enrollmentDate: values.enrollmentDate.format('YYYY-MM-DD')
      };
      await enrollmentsApi.create(formattedData);
      message.success('Enrollment created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchEnrollments();
    } catch (error) {
      if (error.errorFields) {
        return; // Form validation error
      }
      message.error('Failed to create enrollment');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      sorter: (a, b) => a.student.localeCompare(b.student)
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      sorter: (a, b) => a.course.localeCompare(b.course)
    },
    {
      title: 'Enrollment Date',
      dataIndex: 'enrollmentDate',
      key: 'enrollmentDate',
      sorter: (a, b) => new Date(a.enrollmentDate) - new Date(b.enrollmentDate)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => navigate('/enrollments/' + record.id)}>
          View Details
        </Button>
      )
    }
  ];

  return (
    <>
      <Card 
        title="Enrollments" 
        extra={
          <Button type="primary" onClick={handleNewEnrollment}>
            New Enrollment
          </Button>
        }
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={enrollments}
          rowKey="id"
        />
      </Card>

      <Modal
        title="New Enrollment"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={submitting} onClick={handleModalSubmit}>
            Create
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="studentId"
            label="Student"
            rules={[{ required: true, message: 'Please select a student!' }]}
          >
            <Select
              showSearch
              placeholder="Select a student"
              optionFilterProp="children"
            >
              {students.map(student => (
                <Select.Option key={student.id} value={student.id}>
                  {student.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="courseId"
            label="Course"
            rules={[{ required: true, message: 'Please select a course!' }]}
          >
            <Select
              showSearch
              placeholder="Select a course"
              optionFilterProp="children"
            >
              {courses.map(course => (
                <Select.Option key={course.id} value={course.id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="enrollmentDate"
            label="Enrollment Date"
            rules={[{ required: true, message: 'Please select enrollment date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Enrollments;
