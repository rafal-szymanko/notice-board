const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const result = await Post
      .findOne({status: 'published', _id: req.params.id});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/post/add', async (req, res,) => {

  const {author, created, updated, status, title, text, price, phone, location} = req.fields;
  const file = req.files.photo;

  function validateEmail(author) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(author).toLowerCase());
  }

  const fileName = file.path.split('/').slice(-1)[0];

  if (title && author && validateEmail(author) && text) {
    try {
      const newPost = new Post({author: author, created: created, updated: updated, price: price, status: status, title: title, text: text, photo: fileName, phone: phone, location: location});    
      await newPost.save();
      res.json(await Post.find());
    }
    catch(err) {
      res.status(500).json({message: err});
    }
  }
});

module.exports = router;
