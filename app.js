const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const router = require('./routes/router');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '643ea3cad01596c17e02509b',
  };

  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('start server');
});
