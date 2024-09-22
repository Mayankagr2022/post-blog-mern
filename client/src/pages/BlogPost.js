import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/BlogPost.css'; // Import the CSS file

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commenterName, setCommenterName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // Display 5 comments per page


  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/Openblog/${id}`);
      setBlog(response.data);
      setComments(response.data.comments);
      setCommenterName(response.data.author);
    } catch (err) {
      console.error('Error fetching blog post', err);
    }
  };


  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`http://localhost:5000/api/blog/${id}/comments`, {  content: comment }, {
        headers: {
          Authorization: `${token}`
        }
      });
      setComments([...comments, response.data]);
      fetchBlogPost();
      setComment(''); // Clear input
    } catch (err) {
      console.error('Error posting comment', err);
    }
  };

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!blog) return <p>Loading blog post...</p>;

  return (
    <div className="blog-post-container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <small>Author: {blog.author}</small>
      <small>Date: {new Date(blog.createdDate).toLocaleDateString()}</small>

      <div className="comments-section">
        <h3>Comments</h3>
        {currentComments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.content}</p>
            <small>By: {comment.commenterName}</small>
            <small>Date: {new Date(comment.date).toLocaleDateString()}</small>
          </div>
        ))}
        {
          comments && comments.length > 5 &&
          <Pagination
            totalComments={comments.length}
            commentsPerPage={commentsPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        }
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

// Pagination component
function Pagination({ totalComments, commentsPerPage, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default BlogPost;
