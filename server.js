'use strict';

// let cache = {};
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

let weatherData = require('./modules/weather.js');
let handleMovies = require('./modules/movies.js');

app.use(cors());
app.get('/', (request, response) => response.status(200).send('this is the root.'));
app.get('/weather', weatherData);
app.get('/movies', handleMovies);
app.get('*', (request, response) => {
  response.status(404).send('Page not found');
});

app.listen(PORT, () => console.log('Listening on Port: ', PORT));
