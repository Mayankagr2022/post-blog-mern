import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BlogList.css';
import { useNavigate } from 'react-router-dom';



function BlogList() {

  const nav = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog/all');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-container">
      <h1>{ blogs.length ? 'Latest Blogs' : 'No Posts Yet'}</h1>
      {
        blogs.length ? (
        <div className="LatestBlog">
          {blogs.map(blog => (
              <div className="blog-post" key={blog._id}>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-content">{blog.content}</p>
                <div className="blog-meta">
                  <span className="blog-author">Author: {blog.author}</span>
                  <span className="blog-date">Date: {new Date(blog.createdDate).toLocaleDateString()}</span>
                </div>
                <div className='View-Postbtn'>
                  <button onClick={() => nav(`/blog/${blog._id}`)}>
                    View Blog
                  </button>
                </div>
              </div>
            ))}
        </div>
        )
        :
        <div className='NoPosts'>
          <button onClick={() => nav('/create-blog')}>
            Post Something
          </button>
        </div>
      }
    </div>
  );
}

export default BlogList;
