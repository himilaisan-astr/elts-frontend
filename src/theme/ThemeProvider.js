import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from '../context/ThemeContext';

const AntdThemeProvider = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? '#1890ff' : '#1890ff',
            borderRadius: 6,
            wireframe: false,
          },
          components: {
            Card: {
              colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
            },
            Layout: {
              colorBgBody: isDarkMode ? '#000000' : '#ffffff',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
  );
};

export default AntdThemeProvider;
