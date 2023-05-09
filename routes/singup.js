const regRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createUser } = require('../controllers/users');
const { singupValidation } = require('../middlewares/routesValidation');

regRouter.post(
  '/',
  celebrate(singupValidation),
  createUser,
);

module.exports = regRouter;
