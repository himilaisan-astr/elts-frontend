import React from 'react';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

export const TableSettings = ({ allColumns, visibleColumns, onColumnChange }) => {
  const menu = (
    <Menu>
      {allColumns.map(column => (
        <Menu.Item key={column.key || column.dataIndex}>
          <Checkbox
            checked={visibleColumns.includes(column.key || column.dataIndex)}
            onChange={e => {
              const columnKey = column.key || column.dataIndex;
              if (e.target.checked) {
                onColumnChange([...visibleColumns, columnKey]);
              } else {
                onColumnChange(visibleColumns.filter(key => key !== columnKey));
              }
            }}
          >
            {column.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<SettingOutlined />}>Column Settings</Button>
    </Dropdown>
  );
};
