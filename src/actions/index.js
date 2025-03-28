import { Modal, message } from 'antd';
import React from 'react';

export const handleEdit = (course) => {
  Modal.info({
    title: 'Edit Feature Unavailable',
    content: (
      <p>
        Sorry, editing this course is currently unavailable. Please wait for the next update, where we will introduce this feature with exciting improvements. Stay tuned! 🚀
      </p>
    ),
    okText: 'Got it!',
  });
};

export const handleViewDetails = (course) => {
  message.info('View details functionality coming soon');
};

export const handleManageStudents = async (course) => {
  message.warning('Manage students functionality coming soon');
};

export const handleDelete = async (ids) => {
  message.warning('Delete feature is currently unavailable. Please wait for the next update.');
};
