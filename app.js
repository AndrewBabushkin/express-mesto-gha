const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/router');
const limiter = require('./middlewares/ratelimit');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(config.connectDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(limiter);
app.use(helmet());
app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('start server');
});
