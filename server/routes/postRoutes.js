const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');

const router = express.Router();

/* Param Middleware */
// router.param('id', postController.checkID);

// Aliasing Route to be added here whenever needed

router
  .route('/')
  .get(authController.protect, postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
