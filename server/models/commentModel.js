const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    post: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'Comment must belong to a post']
      }
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment must belong to a user']
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Comment = mongoose.model('Review', commentSchema);

module.exports = Comment;
