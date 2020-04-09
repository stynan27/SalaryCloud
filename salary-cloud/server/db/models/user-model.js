const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    hash: { type: String, required: true, unique: true, trim: true },
    anonSalt: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', User);
