const express = require('express');
const Post = require('./../models/postModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

//eslint-disable-next-line
const router = express.Router({ mergeParams: true });

// 1) Check if the user is actually allowed to perform the operation on the post

exports.updateStatus = catchAsync(async (req, res, next) => {
  console.log(req.params.postId);
  const postToBeUpdated = await Post.findById(req.params.postId);

  // Check if the post belongs to user or not
  console.log(req.user._id, postToBeUpdated.user._id);
  const headerUserId = String(req.user._id);
  const askingUserId = String(postToBeUpdated.user._id);

  if (headerUserId !== askingUserId) {
    return next(
      new AppError(
        'Unauthorized. You are not allowed to delete this post!',
        401
      )
    );
  }

  // 2) Check the rights of the user - user or admin
  console.log('here');
  const getUser = await User.findById(req.user._id);
  console.log(getUser);

  // 3) If user, then go to 2

  // 4) If admin, then go to 1
});
