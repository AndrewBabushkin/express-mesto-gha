const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/constants');

const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserId,
);
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);
userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .regex(RegExp(urlRegex))
        .error(new Error('Введите корректный URL'))
        .required(),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
