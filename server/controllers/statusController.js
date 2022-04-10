const express = require('express');
const Post = require('./../models/postModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

//eslint-disable-next-line
const router = express.Router({ mergeParams: true });

// 1) Check if the user is actually allowed to perform the operation on the post

exports.updateStatus = catchAsync(async (req, res, next) => {
  const postToBeUpdated = await Post.findById(req.params.postId);

  // Check if the post belongs to user or not
  const headerUserId = String(req.user._id);
  const askingUserId = String(postToBeUpdated.user._id);

  if (headerUserId !== askingUserId) {
    return next(
      new AppError(
        'Unauthorized. You are not allowed to update the status of this post!',
        401
      )
    );
  }

  // 2) Check the rights of the user - user or admin
  const getUser = await User.findById(req.user._id);
  //   console.log(getUser.role, postToBeUpdated.status);

  // 3) If user, then go to 2
  if (getUser.role === 'user') {
    const doc = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        status: 2
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!doc) {
      return next(
        new AppError('No post found with that ID for updating status', 404)
      );
    }
    return res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  }

  // 4) If admin, then go to 1
  if (getUser.role === 'admin') {
    const doc = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        status: 1
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!doc) {
      return next(
        new AppError('No post found with that ID for updating status', 404)
      );
    }
    return res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  }

  return next(
    new AppError(
      'Unauthorized. You are not allowed to update the status of this post!',
      401
    )
  );
});
