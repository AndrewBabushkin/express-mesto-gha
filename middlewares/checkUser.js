const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

const checkUser = (res, user) => {
  if (!user) {
    throw new DocumentNotFoundError(
      'Пользователь по указанному _id не найден.',
    );
  }
  res.status(200).send(user);
};

module.exports = checkUser;
