import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthCheck = () => {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);
        setHealth(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHealth(null);
      }
    };

    checkHealth();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!health) {
    return <div>Checking backend connection...</div>;
  }

  return (
    <div style={{ color: 'green' }}>
      Backend Status: {health.status}
      <br />
      Service: {health.service}
    </div>
  );
};

export default HealthCheck;
