const mongoose = require('mongoose');
require('mongoose-type-url');
const isUrl = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      require: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Введите корректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
