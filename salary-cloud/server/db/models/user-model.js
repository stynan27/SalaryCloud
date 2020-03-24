const mongoose = require('mongoose');

const User = mongoose.Schema({
  {
    user_name: { type: String, required: true },
    user_id: { type: String, required: true },
    user_password: { type: String, required: true }
  }
});

module.exports = mongoose.model('users', User);
