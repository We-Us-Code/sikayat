const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments
    }
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const createdComment = {
    comment: req.body.comment,
    post: req.body.post,
    user: req.user._id
  };
  const newComment = await Comment.create(createdComment);

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment
    }
  });
});
