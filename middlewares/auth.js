const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthorisationError = require('../errors/AuthorisationError');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV ? JWT_SECRET : 'secretkey');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;
  next();
}
