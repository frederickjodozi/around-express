const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator: v => {
        return /https?:\/\/w{0,3}\.?.*/.test(v);
      },
      message: 'The Avatar image must a valid URL'
    },
    required: true,
  }
});

module.exports = mongoose.model('user', userSchema);