const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A post must have a name'],
    unique: true
  },
  heading: {
    type: String,
    required: [true, 'A post must have a heading']
  },
  body: {
    type: String,
    required: [true, 'A post must have a body'],
    trim: true
  },
  upvotersId: [String],
  downvotersId: [String],
  upvoteCount: {
    type: Number,
    default: 0
  },
  downvoteCount: {
    type: Number,
    default: 0
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: String,
    required: [true, 'A post must have a user ID']
  },
  tags: [String]
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
