import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        {!token ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            {/* <li>
              <Link to="/dashboard">Home</Link>
            </li> */}
            <li>
                <Link to="/create-blog">Create a Blog</Link>
              </li>
              <li>
                <Link to="/blogs">Latest Blogs</Link>
              </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
