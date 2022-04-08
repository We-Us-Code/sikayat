const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
const commentRouter = require('./../routes/commentRoutes');

const router = express.Router();

/* Param Middleware */
// router.param('id', postController.checkID);

//POST /post/23933992fg/comments
// GET /post/4u98034809/comments

router.use('/:postId/comments', commentRouter);

// Aliasing Route to be added here whenever needed

router.use(authController.protect);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
