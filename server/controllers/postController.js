const Post = require('./../models/postModel');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: 'comments' });

exports.createPost = catchAsync(async (req, res, next) => {
  const createdPost = {
    heading: req.body.heading,
    body: req.body.body,
    user: req.user._id
  };
  const newPost = await Post.create(createdPost);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  });
});

exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
