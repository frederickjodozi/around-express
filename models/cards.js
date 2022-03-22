const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {

  },
  owner: {

  },
  likes: {

  },
  createAt: {

  }
});

module.exports = mongoose.model('card', cardSchema);