const express = require('express');
const morgan = require('morgan');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev')); // logs out the request
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware 😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/posts', getAllPosts);
// app.get('/api/v1/posts/:id', getPost);
// app.post('/api/v1/posts', createPost);
// app.patch('/api/v1/posts/:id', updatePost);
// app.delete('/api/v1/posts/:id', deleteTour);

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
