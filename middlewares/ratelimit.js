const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message:
    'Превышено количество запросов на сервер. Пожалуйста, попробуйте позже!',
});

module.exports = limiter;
