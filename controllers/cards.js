const Card = require('../models/card');
const { handleError, CheckUserId } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const createCard = (req, res) => {
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
      handleError(err, res);
    });
};
const deleteCard = (req, res) => {
  // console.log(req.params.cardId);
  Card.findByIdAndDelete(req.params.cardId)
    .then((user) => {
      // console.log(user);
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const addLikeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((user) => {
      // console.log(user);
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};
const deleteLikeCard = (req, res) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((user) => {
      // console.log(user);
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
