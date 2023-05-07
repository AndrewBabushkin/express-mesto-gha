const loginRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');

loginRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

module.exports = loginRouter;
