const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string()
        .regex(RegExp(urlRegex))
        .error(new Error('Введите корректный URL'))
        .required(),
    }),
  }),
  createCard,
);
cardRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  deleteCard,
);
cardRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  addLikeCard,
);
cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  deleteLikeCard,
);

module.exports = cardRouter;
