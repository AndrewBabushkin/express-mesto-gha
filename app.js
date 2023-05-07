const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/router');
const limiter = require('./middlewares/ratelimit');
const errorHandler = require('./errors/errorHandler');

const { PORT } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(limiter);
app.use(helmet());
app.use(errors());
app.use(errorHandler);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next()
});

app.listen(PORT, () => {
  console.log('start server');
});
