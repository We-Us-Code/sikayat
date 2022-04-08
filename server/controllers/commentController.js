const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };

  const comments = await Comment.find(filter);

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments
    }
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user._id;

  const createdComment = {
    comment: req.body.comment,
    post: req.body.post,
    user: req.body.user
  };
  const newComment = await Comment.create(createdComment);

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment
    }
  });
});

exports.deleteComment = factory.deleteOne(Comment);
