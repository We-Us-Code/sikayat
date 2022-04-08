const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

//POST /post/23933992fg/comments
//GET /post/23933992fg/comments
// POST /reviews

router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

router
  .route('/:id')
  .get(authController.protect, commentController.getComment)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);
module.exports = router;
