const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createCardValidation,
  deleteCardValidation,
  addLikeValidation,
  deleteLikeValidation,
} = require('../middlewares/routesValidation');

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
  celebrate(createCardValidation),
  createCard,
);
cardRouter.delete(
  '/:cardId',
  celebrate(deleteCardValidation),
  deleteCard,
);
cardRouter.put(
  '/:cardId/likes',
  celebrate(addLikeValidation),
  addLikeCard,
);
cardRouter.delete(
  '/:cardId/likes',
  celebrate(deleteLikeValidation),
  deleteLikeCard,
);

module.exports = cardRouter;
