const User = require('../models/user');
const {
  ERROR_CODE,
  errorMessage,
  handleError,
  CheckUserId,
} = require('../errors/errors');

const createUser = (req, res) => {
  // console.log(req.body);

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      // console.log(newUser.name);
      if ((!newUser.name || !newUser.about || !newUser.avatar)) {
        return res.status(ERROR_CODE).send(errorMessage);
      }
      return res.send(newUser);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getUserId = (req, res) => {
  // console.log(req.params);
  User.findById(req.params.userId)
    .then((user) => {
      // console.log(user);
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};
const updateProfile = (req, res) => {
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
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      CheckUserId(user, res);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
};
