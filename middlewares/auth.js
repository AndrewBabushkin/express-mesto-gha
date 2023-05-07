const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthorisationError = require('../errors/AuthorisationError');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorisationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorisationError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
