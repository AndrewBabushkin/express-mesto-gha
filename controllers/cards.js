const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const NoRightsError = require('../errors/NoRightsError');

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
      res.status(200).send(newCard);
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
  const userId = req.user._id;

  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      // console.log(card);
      if (!card) {
        return next(new DocumentNotFoundError('Такой карточки не существует.'));
      }
      const ownerId = card.owner.toString();

      if (ownerId !== userId) {
        return next(new NoRightsError('У вас нет прав удалить данную карточку.'));
      }
      return res.status(200).send(card);
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
      if (!card) {
        return next(new DocumentNotFoundError('Такой карточки не существует.'));
      }
      return res.status(200).send(card);
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
      if (!card) {
        return next(new DocumentNotFoundError('Такой карточки не существует.'));
      }
      return res.status(200).send(card);
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
