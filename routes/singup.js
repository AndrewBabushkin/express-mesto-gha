const regRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');

regRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser,
);

module.exports = regRouter;
