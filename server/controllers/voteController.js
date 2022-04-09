const express = require('express');
const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');

//eslint-disable-next-line
const router = express.Router({ mergeParams: true });

exports.upvotePost = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const post = req.params.postId;

  // 1) If user exists in downvoters database array, remove him for that post

  const userInDownvote = await Post.find({ downvoters: user, _id: post });

  if (userInDownvote.length !== 0) {
    //eslint-disable-next-line
    const userInDownvoteDelete = await Post.updateOne(
      {
        _id: post
      },
      { $pull: { downvoters: user } }
    );
  }

  // 2) If user exists in upvote database, remove him for that post

  const userInUpvote = await Post.find({ upvoters: user, _id: post });
  if (userInUpvote.length !== 0) {
    //eslint-disable-next-line
    const userInDownvoteDelete = await Post.updateOne(
      {
        _id: post
      },
      { $pull: { upvoters: user } }
    );

    return res.status(201).json({
      status: 'success',
      message: 'removedUpvote'
    });
  }

  // 3) Else, add the user to the upvote database if he didn't exists in it
  //eslint-disable-next-line
  const newUpvote = await Post.updateOne(
    {
      _id: post
    },
    { $push: { upvoters: user } }
  );

  res.status(201).json({
    status: 'success',
    message: 'addedUpvote'
  });
});

exports.downvotePost = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const post = req.params.postId;

  // 1) If user exists in Upvote DB, then remove it from DB

  const userInUpvote = await Post.find({ upvoters: user, _id: post });

  if (userInUpvote.length !== 0) {
    //eslint-disable-next-line
    const userInUpvoteDelete = await Post.updateOne(
      {
        _id: post
      },
      { $pull: { upvoters: user } }
    );
  }

  // 2) If user exists in Downvote DB, then remove it

  const userInDownvote = await Post.find({ downvoters: user, _id: post });
  if (userInDownvote.length !== 0) {
    //eslint-disable-next-line
    const userInDownvoteDelete = await Post.updateOne(
      {
        _id: post
      },
      { $pull: { downvoters: user } }
    );

    return res.status(201).json({
      status: 'success',
      message: 'removedDownvote'
    });
  }

  // 3) Else add him to Downvote DB
  //eslint-disable-next-line
  const newDownvote = await Post.updateOne(
    {
      _id: post
    },
    { $push: { downvoters: user } }
  );

  res.status(201).json({
    status: 'success',
    message: 'addedDownvote'
  });
});
