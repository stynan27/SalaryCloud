const mongoose = require('mongoose');

const AnonUser = mongoose.Schema(
  {
    anonId: { type: String, required: true, unique: true, trim: true },
    positionTitle: { type: String, trim: true },
    salary: { type: Number, trim: true },
    employer: { type: String, trim: true },
    location: {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        countyCode: { type: String, trim: true},
        stateCode: { type: String, trim: true}
    },
    yearsOfExp: { type: Number, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('anon-users', AnonUser);
