const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

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
  const newObj = newComment.toObject();

  delete newObj.user;
  newObj.user = {
    _id: req.user._id,
    name: req.user.name
  };

  res.status(201).json({
    status: 'success',
    data: {
      comment: newObj
    }
  });
});

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
