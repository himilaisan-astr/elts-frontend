import React from 'react';
import { Form, Input, InputNumber, Select, Modal, DatePicker, message } from 'antd';

const CourseForm = ({ visible, onCancel, onSubmit, loading, teachers = [], initialValues = null }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create course');
      
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Course' : 'Add New Course'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="name"
          label="Course Name"
          rules={[{ required: true, message: 'Please enter course name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter course description' },
            { min: 50, message: 'Description must be at least 50 characters' },
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true, message: 'Please select course level' }]}
        >
          <Select>
            <Select.Option value="Beginner">Beginner</Select.Option>
            <Select.Option value="Intermediate">Intermediate</Select.Option>
            <Select.Option value="Advanced">Advanced</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="max_students"
          label="Maximum Students"
          rules={[{ required: true, message: 'Please enter maximum students' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter course price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[{ required: true, message: 'Please select start date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="end_date"
          label="End Date"
          rules={[{ required: true, message: 'Please select end date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="teacher_id"
          label="Teacher"
          rules={[{ required: true, message: 'Please select a teacher' }]}
        >
          <Select placeholder="Select a teacher">
            {teachers.map(teacher => (
              <Select.Option key={teacher.value} value={teacher.value}>
                {teacher.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;
