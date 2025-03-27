import React from 'react';
import { Form, Input, Select, Modal, message } from 'antd';

const StudentForm = ({ visible, onCancel, onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      message.error('Validation failed:', error);
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
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
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
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true, message: 'Please select level' }]}
        >
          <Select>
            <Select.Option value="Beginner">Beginner</Select.Option>
            <Select.Option value="Intermediate">Intermediate</Select.Option>
            <Select.Option value="Advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="active"
          label="Status"
          initialValue={true}
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentForm;
