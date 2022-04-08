const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

//POST /post/23933992fg/comments
//GET /post/23933992fg/comments
// POST /reviews

router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);
module.exports = router;
