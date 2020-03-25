const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    user_id: { type: Integer, required: true, unique: true, trim: true },
    user_name: { type: String, required: true, unique: true, trim: true },
    user_password: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', User);
