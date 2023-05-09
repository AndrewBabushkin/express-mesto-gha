const mongoose = require('mongoose');

const ValidationError = require('../errors/ValidationError');

const checkError = (err, next) => {
  // console.log(err.name);
  if (err instanceof mongoose.Error.ValidationError) {
    next(new ValidationError('Переданы некорректные данные.'));
  } else {
    next(err);
  }
};

module.exports = checkError;
