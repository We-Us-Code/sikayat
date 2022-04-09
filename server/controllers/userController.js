const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('./../utils/appError');

exports.getLogInStatus = catchAsync(async (req, res, next) => {
  // SEND RESPONSE

  res.status(200).json({
    status: 'success',
    message: 'User is Logged In!',
    user: req.user.id
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /googlelogin instead.'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /googlelogin instead.'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:
      'This route is not defined! You cannot delete a User. Please use /googlelogin instead.'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
