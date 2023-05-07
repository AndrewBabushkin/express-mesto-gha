const regRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

regRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
      avatar: Joi.string()
        .regex(RegExp(urlRegex))
        .error(new Error('Введите корректный URL'))
        .required(),
    }),
  }),
  createUser,
);

module.exports = regRouter;
