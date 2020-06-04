const mongoose = require('mongoose');

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

mongoose.connect('mongodb://' + username + ':' + password + '@' + host + ':27017/salary_cloud_db',
  { useNewUrlParser: true, useUnifiedTopology: true }).catch( e => {
    console.error('Connection error', e.message)
  });

const db = mongoose.connection;

module.exports = db;
