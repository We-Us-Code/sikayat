const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

module.exports = router;
