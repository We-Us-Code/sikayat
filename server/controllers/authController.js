const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.googlelogin = catchAsync(async (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    .then(async googleRes => {
      const isEmailVerified = googleRes.payload.email_verified;

      const { name, email, picture } = googleRes.payload;

      if (!isEmailVerified) {
        res.status(401).json({
          status: 'fail',
          message: 'unauthorized'
        });
      }

      let user = await User.findOne({ email });

      if (!user) {
        const newUserObj = {
          name: name,
          email: email,
          photo: picture
        };
        user = await User.create(newUserObj);
      }

      createSendToken(user, 200, req, res);
    });
});
