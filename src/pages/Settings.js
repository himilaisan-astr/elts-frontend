import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Tabs, Switch, Select, Space, message } from 'antd';
import { useAuth } from '../hooks/useAuth';

const { TabPane } = Tabs;

const Settings = () => {
  const [form] = Form.useForm();
  const { user, updateUserProfile } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.full_name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleProfileSubmit = async (values) => {
    try {
      await updateUserProfile(values);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile: ' + error.message);
    }
  };

  const handlePasswordSubmit = (values) => {
    console.log('Password updated:', values);
  };

  const handleNotificationSettings = (values) => {
    console.log('Notification settings updated:', values);
  };

  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile Settings" key="1">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleProfileSubmit}
            initialValues={{
              name: '',
              email: '',
            }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Password" key="2">
          <Form layout="vertical" onFinish={handlePasswordSubmit}>
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Notifications" key="3">
          <Form layout="vertical" onFinish={handleNotificationSettings}>
            <Form.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item label="Notification Frequency" name="frequency">
              <Select defaultValue="daily">
                <Select.Option value="realtime">Real-time</Select.Option>
                <Select.Option value="daily">Daily Digest</Select.Option>
                <Select.Option value="weekly">Weekly Digest</Select.Option>
              </Select>
            </Form.Item>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Card size="small" title="Notification Types">
                <Form.Item label="New Student Registration" name="newStudent" valuePropName="checked">
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item label="Course Updates" name="courseUpdates" valuePropName="checked">
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item label="System Announcements" name="systemAnnouncements" valuePropName="checked">
                  <Switch defaultChecked />
                </Form.Item>
              </Card>
            </Space>

            <Form.Item style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit">
                Save Notification Settings
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Settings;
