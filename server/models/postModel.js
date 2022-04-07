const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'A post must have a heading'],
      maxlength: [100, 'A post heading cannot have more than 100 characters'],
      minLength: [10, 'A post heading must have atleast 10 characters'],
      trim: true
    },
    body: {
      type: String,
      required: [true, 'A post must have a body'],
      trim: true,
      maxlength: [2000, 'A post body cannot have more than 2000 characters'],
      minLength: [10, 'A post body must have atleast 10 characters']
    },
    upvotersId: {
      type: [String],
      default: []
    },
    downvotersId: {
      type: [String],
      default: []
    },
    upvoteCount: {
      type: Number,
      default: 0
    },
    downvoteCount: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    tags: {
      type: [String],
      default: []
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

// Embedding the data inside document
// postSchema.pre('save', async function(next) {
//   const userPromises = this.user.map(async id => await User.findById(id));
//   this.user = await Promise.all(userPromises);
//   next();
// });

// QUERY MIDDLEWARE
postSchema.pre(/^find/, function(next) {
  this.start = Date.now();
  next();
});

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: '-__v -email'
  });
  next();
});

postSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
