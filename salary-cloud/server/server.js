const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

const db = require('./db/database');
const userRouter = require('./routes/user-router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.get('/', (request, response) => {
  response.send('hello world');
});

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
