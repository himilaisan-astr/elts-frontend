import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Tag, message, Dropdown, Menu, Tooltip, Modal, Checkbox } from 'antd';
import ResizableTable from '../components/ResizableTable';
import {
  SearchOutlined,
  UserAddOutlined,
  SettingOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CheckOutlined,
  StopOutlined,
  DownOutlined
} from '@ant-design/icons';
import { studentsApi, bulkActions } from '../services/api';
import StudentForm from '../components/StudentForm';
import { TableSettings } from '../components/TableSettings';

const Students = () => {
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(['first_name', 'last_name', 'email', 'phone', 'level', 'status']);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const allColumns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      filters: [
        { text: 'Beginner', value: 'Beginner' },
        { text: 'Intermediate', value: 'Intermediate' },
        { text: 'Advanced', value: 'Advanced' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      render: active => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete([record.id])}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentsApi.getAll();
      setStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setColumns(allColumns.filter(col => visibleColumns.includes(col.key || col.dataIndex)));
  }, [visibleColumns]);

  const handleEdit = (record) => {
    setSelectedStudent(record);
    setModalVisible(true);
  };

  const handleDelete = async (ids) => {
    Modal.confirm({
      title: 'Are you sure you want to delete these students?',
      content: `This will permanently delete ${ids.length} student(s).`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        setConfirmLoading(true);
        try {
          await Promise.all(ids.map(id => studentsApi.delete(id)));
          message.success('Students deleted successfully');
          fetchStudents();
          setSelectedRows([]);
        } catch (error) {
          message.error('Failed to delete students');

        } finally {
          setConfirmLoading(false);
        }
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
    }
  };

  const handleBulkActions = async ({ key }) => {
    try {
      switch (key) {
        case 'delete':
          await bulkActions.deleteStudents(selectedRowKeys);
          message.success('Students deleted successfully');
          fetchStudents();
          setSelectedRowKeys([]);
          setSelectedRows([]);
          break;
        case 'activate':
          await bulkActions.activateStudents(selectedRowKeys);
          message.success('Students activated successfully');
          fetchStudents();
          setSelectedRowKeys([]);
          setSelectedRows([]);
          break;
        case 'deactivate':
          await bulkActions.deactivateStudents(selectedRowKeys);
          message.success('Students deactivated successfully');
          fetchStudents();
          setSelectedRowKeys([]);
          setSelectedRows([]);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
      message.error(`Failed to perform bulk action: ${error.message}`);
    }
  };

  const handleCreateStudent = async (values) => {
    try {
      setLoading(true);
      await studentsApi.create(values);
      message.success('Student created successfully');
      setModalVisible(false);
      fetchStudents(); // Refresh the list
    } catch (error) {
      message.error('Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search text
  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const [columns, setColumns] = useState(allColumns.filter(col => visibleColumns.includes(col.key)));

  return (
    <Card
      style={{ width: '100%', overflow: 'auto' }}
      title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>Students Management</span>
          <Space>
            <TableSettings
              allColumns={allColumns}
              visibleColumns={visibleColumns}
              onColumnChange={setVisibleColumns}
            />
          </Space>
        </Space>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="Search students"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => {
                setSelectedStudent(null);
                setModalVisible(true);
              }}
            >
              Add Student
            </Button>
          </Space>
        </Space>
        {selectedRows.length > 0 && (
          <Space>
            <span>{selectedRows.length} items selected</span>
            <Dropdown
              overlay={
                <Menu onClick={handleBulkActions}>
                  <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                    Delete Selected
                  </Menu.Item>
                  <Menu.Item key="activate" icon={<CheckOutlined />}>
                    Activate Selected
                  </Menu.Item>
                  <Menu.Item key="deactivate" icon={<StopOutlined />}>
                    Deactivate Selected
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                Bulk Actions <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        )}
      </div>
      <ResizableTable
        columns={columns}
        dataSource={filteredStudents}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        pagination={{
          total: filteredStudents.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowSelection={rowSelection}
        loading={loading || confirmLoading}
      />

      <StudentForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedStudent(null);
        }}
        onSubmit={handleCreateStudent}
        loading={loading}
        initialValues={selectedStudent}
      />
    </Card>
  );
};

export default Students;
