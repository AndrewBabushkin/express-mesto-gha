const mongoose = require('mongoose');
require('mongoose-type-url');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: mongoose.SchemaTypes.Url,
    require: true,
  },
});

module.exports = mongoose.model('user', userSchema);
