'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;


app.get('/', (request, response) => response.status(200).send('this is the root.'));
app.get('*', (request, response) => {
  response.status(404).send('Page not found');
});


app.listen(PORT, () => console.log('Listening on Port: ', PORT));
