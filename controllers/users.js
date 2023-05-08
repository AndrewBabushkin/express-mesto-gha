const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ValidationError = require('../errors/ValidationError');
const EmailExistsError = require('../errors/EmailExistsError');
const AuthorisationError = require('../errors/AuthorisationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const User = require('../models/user');

const createUser = (req, res, next) => {
  // console.log(req.body);

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
      res.status(200).send({
        user: {
          email: newUser.email,
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
        },
      });
    })
    .catch((err) => {
      // console.log(err.code);
      if (err.code === 11000) {
        next(
          new EmailExistsError(
            'Пользователь с таким email уже зарегистрирован.',
          ),
        );
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильные почта или пароль.');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
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
    .then((user) => {
      // console.log(user);
      if (!user) {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден.',
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
};
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден.',
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user;
  // console.log(req.body);
  // console.log(req.user);
  // console.log(userId);
  // console.log(res.user._id);
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      // console.log(user);
      if (!user) {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден.',
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден.',
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные.'));
      }
      next(err);
    });
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
