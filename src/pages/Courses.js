import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Input, Space, Tag, message, Dropdown, Menu, Tooltip, Modal } from 'antd';
import ResizableTable from '../components/ResizableTable';
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  CheckOutlined,
  StopOutlined,
  DownOutlined
} from '@ant-design/icons';
import { coursesApi } from '../services/api';
import { bulkActions } from '../services/bulkActions';
import CourseForm from '../components/CourseForm';
import { CourseCard } from '../components/cards';
import { handleEdit, handleViewDetails, handleManageStudents, handleDelete } from '../actions';
import { fetchCourses, fetchTeachers } from '../services/apiActions';

const Courses = () => {
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [visibleColumns, setVisibleColumns] = useState(['name', 'level', 'price', 'max_students', 'status', 'actions']);
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [selectedCourseForStudents, setSelectedCourseForStudents] = useState(null);
  const [courseStudents, setCourseStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);


  useEffect(() => {
    fetchCourses(setCourses);
    fetchTeachers(setTeachers);
  }, []);

  const handleBulkActions = async ({ key }) => {
    try {
      switch (key) {
      case 'delete':
        handleDelete(selectedRows);
        break;
      case 'activate':
        await bulkActions.activateCourses(selectedRows);
        message.success('Courses activated successfully');
        fetchCourses();
        setSelectedRows([]);
        break;
      case 'deactivate':
        await bulkActions.deactivateCourses(selectedRows);
        message.success('Courses deactivated successfully');
        fetchCourses();
        setSelectedRows([]);
        break;
      default:
        break;
      }
    } catch (error) {
      message.error('Failed to perform bulk action');
    }
  };

  const handleCreateCourse = async (values) => {
    try {
      setLoading(true);
      await coursesApi.create(values);
      message.success('Course created successfully');
      setModalVisible(false);
      fetchCourses(); // Refresh the list
      setSelectedCourse(null);
    } catch (error) {
      message.error('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (id, values) => {
    try {
      setLoading(true);
      await coursesApi.update(id, values);
      message.success('Course updated successfully');
      setModalVisible(false);
      fetchCourses(); // Refresh the list
      setSelectedCourse(null);
    } catch (error) {
      message.error('Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search text
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterMode: 'tree',
      filterSearch: true,
      filters: [...new Set(courses.map(c => c.name))]
        .map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.name === value,
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Capacity',
      dataIndex: 'max_students',
      key: 'max_students',
      sorter: (a, b) => a.max_students - b.max_students,
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
          <Tooltip title="View Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={()=> handleViewDetails(record)}
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

  return (
    <Card
      style={{ width: '100%', overflow: 'auto' }}
      title={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>Courses Management</span>
          <Space>
            <Tooltip title="View Mode">
              <Button.Group>
                <Button
                  type={viewMode === 'grid' ? 'primary' : 'default'}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  type={viewMode === 'table' ? 'primary' : 'default'}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </Button.Group>
            </Tooltip>
          </Space>
        </Space>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
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
              onClick={() => {
                setSelectedCourse(null);
                setModalVisible(true);
              }}
            >
            Add Course
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

      {viewMode === 'grid' ? (
        <Row gutter={[16, 16]}>
          {filteredCourses.map(course => (
            <Col key={course.id}>
              <CourseCard
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onManageStudents={handleManageStudents}
                onViewDetails={handleViewDetails}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <ResizableTable
          columns={columns}
          dataSource={filteredCourses}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          pagination={{
            total: filteredCourses.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          rowSelection={{
            type: 'checkbox',
            onChange: setSelectedRows,
            selectedRowKeys: selectedRows,
          }}
          loading={loading || confirmLoading}
        />
      )}

      <CourseForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedCourse(null);
        }}
        initialValues={selectedCourse}
        onSubmit={(values) => {
          // Convert dates to ISO string format
          const formattedValues = {
            ...values,
            start_date: values.start_date.toISOString(),
            end_date: values.end_date.toISOString(),
          };
          if (selectedCourse) {
            handleUpdateCourse(selectedCourse.id, formattedValues);
          } else {
            handleCreateCourse(formattedValues);
          }
        }}
        loading={loading}
        teachers={teachers.map(teacher => ({
          value: teacher.id,
          label: `${teacher.first_name} ${teacher.last_name}`,
        }))}
      />

      <Modal
        title={`Manage Students - ${selectedCourseForStudents?.name || ''}`}
        visible={studentModalVisible}
        onCancel={() => {
          setStudentModalVisible(false);
          setSelectedCourseForStudents(null);
          setCourseStudents([]);
        }}
        footer={null}
        width={800}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // TODO: Implement add student to course
              message.info('Add student functionality coming soon');
            }}
          >
            Add Student
          </Button>
          
          <ResizableTable
            columns={[
              {
                title: 'Name',
                key: 'name',
                render: (_, record) => `${record.first_name} ${record.last_name}`,
              },
              {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => (
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      // TODO: Implement remove student from course
                      message.info('Remove student functionality coming soon');
                    }}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
            dataSource={courseStudents}
            rowKey="id"
          />
        </Space>
      </Modal>
    </Card>
  );
};

export default Courses;
