import React from 'react';
import { Form, Input, Select, Modal, message } from 'antd';

const TeacherForm = ({ visible, onCancel, onSubmit, loading }) => {
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
      title="Add New Teacher"
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
          name="specialization"
          label="Specialization"
          rules={[{ required: true, message: 'Please select a specialization' }]}
        >
          <Select placeholder="Select specialization">
            <Select.Option value="Mathematics">Mathematics</Select.Option>
            <Select.Option value="Physics">Physics</Select.Option>
            <Select.Option value="Chemistry">Chemistry</Select.Option>
            <Select.Option value="Biology">Biology</Select.Option>
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="History">History</Select.Option>
            <Select.Option value="Computer Science">Computer Science</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="e.g., 123-456-7890" />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: 'Please enter teacher bio' }]}
        >
          <Input.TextArea rows={4} />
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

export default TeacherForm;
