const userRouter = require('express').Router();

const {
  createUser,
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
