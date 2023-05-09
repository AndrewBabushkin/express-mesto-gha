const { Joi } = require('celebrate');

const urlRegex = require('../utils/constants');

const singupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(urlRegex),
  }),
};

const singinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
};

const UserIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(urlRegex)
      .required(),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .regex(urlRegex)
      .required(),
  }),
};

const deleteCardValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

const addLikeValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

const deleteLikeValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
};

module.exports = {
  singupValidation,
  singinValidation,
  UserIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  addLikeValidation,
  deleteLikeValidation,
};
