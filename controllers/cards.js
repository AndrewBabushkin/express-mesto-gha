const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.user);
  const { name, link } = req.body;
  const userId = req.user._id;
  // console.log(userId);

  Card.create({ name, link, owner: userId })
    .then((newCard) => {
      res.send(newCard);
      // console.log(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
};
const deleteCard = (req, res, next) => {
  // console.log(req.params.cardId);
  const { cardId } = req.params.cardId;
  const { userId } = req.user._id;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      const ownerId = card.owner.id;
      if (ownerId !== userId) {
        res.status(401).send({ message: 'Нет прав удалить данную карточку' });
      }
      res.send(card);
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
const deleteLikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
