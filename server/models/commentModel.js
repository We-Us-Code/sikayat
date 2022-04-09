const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
      trim: true,
      minLength: [1, 'A comment must have atleast one character'],
      maxlength: [300, 'A comment cannot have more than 300 characters']
    },
    createdAt: {
      type: Date,
      default: () => {
        return Date.now();
      }
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a post']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.pre(/^find/, function(next) {
  /* Because of Query Middleware, when populate gets fired on post path
    for comments, it automatically triggers the other Query middleware 
    on posts. Therefore you need to specifically select the results.*/

  this.populate({
    path: 'user',
    select: 'name'
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
