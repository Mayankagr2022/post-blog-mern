import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import CreateBlogPost from './components/CreateBlogPost';
import BlogList from './components/BlogList';
import BlogPost from './pages/BlogPost';

function App() {

  useEffect(() => {
    // Force redirect to register on initial load
    if (window.location.pathname === '/') {
      window.location.replace('/register');
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlogPost />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
