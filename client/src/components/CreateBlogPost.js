import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateBlogPost.css';
import { useNavigate } from 'react-router-dom';


function CreateBlogPost() {
  const nav= useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const [errorMsg , setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    if(!formData.title || !formData.content){
      setErrorMsg('All fields are required');
      return;
    }

    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/blog', formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log('Blog created successfully', response.data);
      nav('/blogs');
    } catch (err) {
      console.error('Error creating blog post', err);
    }
  };

  return (
    <div className="blog-form-container">
      <div className="blog-form">
        <h2>Create a Blog Post</h2>
        <div className='middle'>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              value={formData.title}
              onChange={handleChange}
              autoComplete="off"
              className="blog-input"
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Write Something..."
              value={formData.content}
              onChange={handleChange}
              className="blog-textarea"
            />
          </div>
        </div>
        <div style={{color: "red", padding: "5px"}}>
          {errorMsg}
        </div>
        <button onClick={handleSubmit} className="submit-button">Create Blog Post</button>
      </div>
    </div>
  );
}

export default CreateBlogPost;
