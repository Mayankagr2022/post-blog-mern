import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Import the CSS file

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: { Authorization: `${token}` }
        });
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
        setMessage('Access denied');
      }
    };

    fetchProtectedData();
  }, []);

  return <h1>{message}</h1>;
}

export default Dashboard;
