const JWT = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = JWT.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new AuthenticationError());
  }

  req.user = payload;

  next();
};
