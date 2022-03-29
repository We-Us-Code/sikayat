const express = require('express');
const postController = require('./../controllers/postController');

const router = express.Router();

/* Param Middleware */
router.param('id', postController.checkID);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.checkBody, postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
