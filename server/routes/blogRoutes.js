const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const authMiddleware = require('../middleware/auth');


// Add a comment to a blog post
// router.post('/blog/:id/comments', authMiddleware, async (req, res) => {
//   const { content } = req.body;
//   const  blogId = req.params.id;
//   try {
//     const post = await BlogPost.findById(blogId);
//     if (!post) {
//       return res.status(404).json({ error: 'Blog post not found' });
//     }
//     post.comments.push({ content, author: req.user._id });
//     await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: 'Error adding comment' });
//   }
// });




// Create a new blog post


router.post('/blog/:id/comments', authMiddleware, async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });


    // commenterName should be come from authMiddleware

    const newComment ={ 
      commenterName: req.user.id,
      content: req.body.content,
    }


    // const newComment = {
    //   commenterName,
    //   content: req.body.content,
    // };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch comments for a specific blog post
router.get('/blog/:id/comments', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog.comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



router.get('/Openblog/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id); // Find the blog post by its ID
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog); // Return the blog post and its comments
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog post', error: err });
  }
});


router.post('/blog', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id, // Author is the logged-in user
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Error saving blog post' });
  }
});

// get all the blog post 

router.get('/blog/all', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});


module.exports = router;
