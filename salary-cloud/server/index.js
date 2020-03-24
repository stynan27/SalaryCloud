const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const db = require('./db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (request, response) => {
  response.send('hello world');
});


app.listen(port, () => console.log(`Server running on port ${port}`));
