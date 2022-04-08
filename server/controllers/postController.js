const Post = require('./../models/postModel');
// const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Comment = require('./../models/commentModel');

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

exports.deletePost = catchAsync(async (req, res, next) => {
  const docToBeDeleted = await Post.findById(req.params.id);

  // Check if the comment belongs to user or not
  const headerUserId = String(req.user._id);
  const askingUserId = String(docToBeDeleted.user._id);

  if (headerUserId !== askingUserId) {
    return next(
      new AppError(
        'Unauthorized. You are not allowed to delete this post!',
        401
      )
    );
  }

  // Before deletion of Post with id, remove all the comments associated with it
  const deletedComments = await Comment.deleteMany({ post: req.params.id });

  const doc = await Post.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
