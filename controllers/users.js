const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const ValidationError = require('../errors/ValidationError');
const EmailExistsError = require('../errors/EmailExistsError');
const AuthorisationError = require('../errors/AuthorisationError');
const checkUser = require('../middlewares/checkUser');
const checkError = require('../middlewares/checkError');

const config = require('../config');
const User = require('../models/user');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((newUser) => {
      // console.log(newUser);
      res.status(201).send({
        user: {
          email: newUser.email,
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
        },
      });
    })
    .catch((err) => {
      // console.log(err);
      if (err.code === 11000) {
        next(
          new EmailExistsError(
            'Пользователь с таким email уже зарегистрирован.',
          ),
        );
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильные почта или пароль.');
      }
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  // console.log(req.params);
  User.findById(req.params.userId)
    .then((user) => checkUser(res, user))
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => checkUser(res, user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(res, user))
    .catch((err) => checkError(err, next));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => checkUser(res, user))
    .catch((err) => checkError(err, next));
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  login,
};
