const { validationResult } = require('express-validator/check');
const Post = require('../models/Post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { 
        _id: '1',
        title: 'First Post', 
        content: 'This is the first post!', 
        imageUrl: 'images/duck.jpeg',
        creator: {
          name: 'Andrew'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed, entered data is incorrecy');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post ({
    title: title, 
    content: content,
    imageUrl: 'images/duck.jpeg',
    creator: { name: 'andrew' },
  });
  post.save()
  .then(result => {
    res.status(201).json({
      message: 'Post created Successfully!', 
      post: result,
    });
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};