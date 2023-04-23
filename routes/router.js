const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { ERROR_NOT_FOUND_CODE, errorMessagePageNotFound } = require('../errors/errors');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.patch('*', (req, res) => {
  res.status(ERROR_NOT_FOUND_CODE).send(errorMessagePageNotFound);
});
module.exports = router;
