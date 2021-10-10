'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('greetings from city explorer server');
});
app.get('/weather', (request, response) => response.json({name: 'captain'}));




app.listen(PORT, () => console.log('listening on Port:', PORT));
