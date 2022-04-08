const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/googlelogin', authController.googleLogin);
router.get(
  '/is-logged-in',
  authController.protect,
  userController.getLogInStatus
);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
