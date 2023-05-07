const router = require('express').Router();

const PageNotFoundError = require('../errors/PageNotFoundError');

const userRouter = require('./users');
const cardRouter = require('./cards');
const loginRouter = require('./signin');
const regRouter = require('./singup');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/signup', regRouter);
router.use('/signin', loginRouter);

router.all('*', (req, res, next) => {
  next(new PageNotFoundError('Страница не найдена!'));
});
module.exports = router;
