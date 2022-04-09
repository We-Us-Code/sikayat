const Post = require('./../models/postModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Comment = require('./../models/commentModel');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on post (hack)
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };

  const totalDocuments = await Post.countDocuments();

  const features = new APIFeatures(Post.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    totalDocuments: totalDocuments,
    data: {
      data: doc
    }
  });
});

exports.getPost = factory.getOne(Post, { path: 'comments' });

exports.createPost = catchAsync(async (req, res, next) => {
  const createdPost = {
    heading: req.body.heading,
    body: req.body.body,
    user: req.user._id,
    images: req.body.images
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
  //eslint-disable-next-line
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
