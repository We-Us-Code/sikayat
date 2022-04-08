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

router
  .route('/')
  .get(authController.protect, postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route('/:id')
  .get(authController.protect, postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    postController.deletePost
  );

module.exports = router;
