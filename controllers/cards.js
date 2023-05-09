const Card = require('../models/card');
// const ValidationError = require('../errors/ValidationError');
const checkCard = require('../middlewares/checkCard');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const checkError = require('../middlewares/checkError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((newCard) => {
      res.status(200).send(newCard);
    })
    .catch((err) => checkError(err, next));
};

const deleteCard = (req, res, next) => {
  // console.log(req.params.cardId);
  const userId = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      // console.log(card);
      if (!card) {
        throw new DocumentNotFoundError('Такой карточки не существует.');
      }
      const ownerId = card.owner.toString();

      if (ownerId === userId) {
        Card.deleteOne({ _id: req.params.cardId })
          .then(res.status(200).send(card));
      } else {
        throw new NoRightsError('У вас нет прав удалить данную карточку.');
      }
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
    .then((card) => checkCard(res, card))
    .catch(next);
};
const deleteLikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => checkCard(res, card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
