const SUCCESS_RESPONSE_CODE = 200;
const ERROR_CODE = 400;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_SERVER_CODE = 500;

const errorMessage = {
  message: 'Переданы некорректные данные',
};
const errorMessageNotFound = {
  message: 'Информация по указанному _id не найдена.',
};
const errorMessageServer = {
  message: 'Произошла ошибка.',
};

const handleError = (err, res) => {
  // console.log(err.name);
  if (err.name === 'ValidationError') {
    return res.status(ERROR_CODE).send(errorMessage);
  }
  if (err.name === 'CastError') {
    return res.status(ERROR_CODE).send(errorMessage);
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(ERROR_NOT_FOUND_CODE).send(errorMessageNotFound);
  }
  return res.status(ERROR_SERVER_CODE).send(errorMessageServer);
};

const CheckUserId = (user, res) => {
  if (!user) {
    return res.status(ERROR_NOT_FOUND_CODE).send(errorMessageNotFound);
  }
  return res.status(SUCCESS_RESPONSE_CODE).send(user);
};

module.exports = {
  ERROR_CODE,
  errorMessage,
  handleError,
  CheckUserId,
};
