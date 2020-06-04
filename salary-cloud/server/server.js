const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}

const app = express();
const port = 8080;

const db = require('./db/database');
const userRouter = require('./routes/user-router');
const anonUserRouter = require('./routes/anon-user-router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', () => {
  console.log('MongoDB connection established successfully');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/../build'));

  app.get('*', (request, response) => {
      response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
} 

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
