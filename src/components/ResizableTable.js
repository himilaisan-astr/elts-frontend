import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

// Resizable column component
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          style={{ position: 'absolute', right: 0, bottom: 0, cursor: 'col-resize', width: 10, height: '100%' }}
        />
      }
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const ResizableTable = ({ columns = [], dataSource, ...props }) => {
  const [resizableColumns, setResizableColumns] = useState([]);

  useEffect(() => {
    // Ensure columns is an array before updating state
    if (Array.isArray(columns)) {
      setResizableColumns(
        columns.map((col) => ({
          ...col,
          width: col.width || 150, // Default width if not provided
        }))
      );
    }
  }, [columns]); // Re-run when columns change

  const handleResize = (index) => (e, { size }) => {
    const newColumns = [...resizableColumns];
    newColumns[index] = {
      ...newColumns[index],
      width: size.width,
    };
    setResizableColumns(newColumns);
  };

  const mergedColumns = resizableColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergedColumns}
      dataSource={dataSource}
      {...props}
    />
  );
};

export default ResizableTable;
