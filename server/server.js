const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes); // Add protected routes
app.use('/api', blogRoutes);       // Blog routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
