const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  commenterName: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  comments: [commentSchema] // Array of comments
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
