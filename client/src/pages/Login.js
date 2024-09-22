import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
    <h2>Login</h2>
    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      value={formData.email}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      value={formData.password}
    />
    <button type="submit">Login</button>
  </form>
  );
}

export default Login;
