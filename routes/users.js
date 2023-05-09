const userRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { UserIdValidation, updateProfileValidation, updateAvatarValidation } = require('../middlewares/routesValidation');

const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get(
  '/:userId',
  celebrate(UserIdValidation),
  getUserId,
);
userRouter.patch(
  '/me',
  celebrate(updateProfileValidation),
  updateProfile,
);
userRouter.patch(
  '/me/avatar',
  celebrate(updateAvatarValidation),
  updateAvatar,
);

module.exports = userRouter;
