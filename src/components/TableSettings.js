import React from 'react';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

export const TableSettings = ({ allColumns, visibleColumns, onColumnChange }) => {
  const menu = (
    <Menu>
      {allColumns.map(column => {
        const columnKey = column.key || column.dataIndex;
        return (
          <Menu.Item key={columnKey}>
            <Checkbox
              checked={visibleColumns.includes(columnKey)}
              onChange={e => {
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
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<SettingOutlined />}>Column Settings</Button>
    </Dropdown>
  );
};
