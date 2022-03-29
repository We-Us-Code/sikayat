const fs = require('fs');

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/posts-simple.json`)
);

/* Params Middleware for checking ID */
exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  if (req.params.id * 1 > posts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.heading || !req.body.body) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing heading or body',
    });
  }
  next();
};

exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: posts.length,
    data: {
      posts: posts,
    },
  });
};

exports.getPost = (req, res) => {
  const id = req.params.id * 1;
  const post = posts.find((el) => el.id === id);

  console.log(req.params);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
};

exports.createPost = (req, res) => {
  //console.log(req.body);

  const newId = posts[posts.length - 1].id + 1;
  const newPost = Object.assign({ id: newId }, req.body);

  posts.push(newPost);

  fs.writeFile(
    `${__dirname}/dev-data/data/posts-simple.json`,
    JSON.stringify(posts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          post: newPost,
        },
      });
    }
  );
};

exports.updatePost = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      post: '<Updated post here...>',
    },
  });
};

exports.deletePost = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
