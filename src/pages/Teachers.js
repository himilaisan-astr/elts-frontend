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
import { teachersApi, bulkActions } from '../services/api';
import TeacherForm from '../components/TeacherForm';
import { TableSettings } from '../components/TableSettings';


// TODO: fix the bulk actions service

const Teachers = () => {
  const [searchText, setSearchText] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(['name', 'email', 'specialization', 'status']);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const allColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
      sorter: (a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      filterMode: 'tree',
      filterSearch: true,
      filters: [...new Set(teachers.map(t => t.email))]
        .map(email => ({ text: email, value: email })),
      onFilter: (value, record) => record.email === value,
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
      render: specialization => (
        <Tag color="blue">{specialization}</Tag>
      ),
      filters: [...new Set(teachers.map(t => t.specialization))]
        .map(spec => ({ text: spec, value: spec })),
      onFilter: (value, record) => record.specialization === value,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
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
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button 
              type="link" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record)}
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
    },
  ];

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await teachersApi.getAll();
      setTeachers(response.data);
    } catch (error) {
      message.error(error.message || 'Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setColumns(allColumns.filter(col => {
      return visibleColumns.includes(col.key || col.dataIndex);
    }));
  }, [visibleColumns]);

  const handleCreateTeacher = async (values) => {
    try {
      setLoading(true);
      await teachersApi.create(values);
      message.success('Teacher created successfully');
      setModalVisible(false);
      fetchTeachers(); // Refresh the list
    } catch (error) {
      message.error('Failed to create teacher');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setModalVisible(true);
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
          await bulkActions.deleteTeachers(selectedRowKeys);
          message.success('Teachers deleted successfully');
          fetchTeachers();
          setSelectedRowKeys([]);
          setSelectedRows([]);
          break;
        case 'activate':
          await bulkActions.activateTeachers(selectedRowKeys);
          message.success('Teachers activated successfully');
          fetchTeachers();
          setSelectedRowKeys([]);
          setSelectedRows([]);
          break;
        case 'deactivate':
          await bulkActions.deactivateTeachers(selectedRowKeys);
          message.success('Teachers deactivated successfully');
          fetchTeachers();
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

  // Filter teachers based on search text
  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchText.toLowerCase())
  );

  const [columns, setColumns] = useState(allColumns.filter(col => {
    return visibleColumns.includes(col.key || col.dataIndex);
  }));

  return (
    <Card 
      style={{ width: '100%', overflow: 'auto' }}
      title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>Teachers Management</span>
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
              placeholder="Search teachers"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Teacher
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
        dataSource={filteredTeachers}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        rowSelection={rowSelection}
        pagination={{
          total: filteredTeachers.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={loading || confirmLoading}
      />

      <TeacherForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleCreateTeacher}
        loading={loading}
      />
    </Card>
  );
};

export default Teachers;
