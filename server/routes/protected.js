const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Protected route to fetch some data
router.get('/', auth, (req, res) => {
  res.json({ message: 'Welcome to the protected route!' });
});

module.exports = router;
