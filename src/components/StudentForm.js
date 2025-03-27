import React from 'react';
import { Form, Input, Select, Modal } from 'antd';

const StudentForm = ({ visible, onCancel, onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Add New Student"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter student name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="course"
          label="Course"
          rules={[{ required: true, message: 'Please select a course' }]}
        >
          <Select>
            <Select.Option value="Mathematics">Mathematics</Select.Option>
            <Select.Option value="Science">Science</Select.Option>
            <Select.Option value="English">English</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="active"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentForm;
