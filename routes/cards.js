const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', addLikeCard);
cardRouter.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardRouter;
