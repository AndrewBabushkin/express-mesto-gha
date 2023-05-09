const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

const checkCard = (res, card) => {
  if (!card) {
    throw new DocumentNotFoundError('Такой карточки не существует.');
  }
  res.status(200).send(card);
};

module.exports = checkCard;
