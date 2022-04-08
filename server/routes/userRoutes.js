const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/googlelogin', authController.googleLogin);

router.use(authController.protect);

router.get('/is-logged-in', userController.getLogInStatus);
router.get('/me', userController.getMe, userController.getUser);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
