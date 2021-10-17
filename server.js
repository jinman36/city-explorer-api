'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();
const axios = require('axios');
app.use(cors());
const PORT = process.env.PORT || 3001;


app.get('/', (request, response) => response.status(200).send('this is the root.'));

app.get('/weather', handleWeather);

app.get('*', (request, response) => {
  response.status(404).send('Page not found');
});

async function handleWeather(request, response) {
  // console.log('query parameters:', request.query);
  // console.log(searchQuery);
  // let foundCity = weather.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());
  // console.log(foundCity.data);
  let { lat, lon } = request.query;
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&units=I&key=${process.env.REACT_APP_WEATHER_API_KEY}`;

  try {
    let weatherData = await axios.get(weatherUrl);
    let weatherObject = weatherData.data;

    const weatherArray = weatherObject.data.map(day =>new Forecast(day));
    // console.log(weatherArray);
    response.status(200).send(weatherArray);
  }
  catch (error) {
    // console.log('Cannot find City');
    response.status(500).send('Unable to get Forecast');
  }



  response.status(200).send('weather route works');
}

class Forecast {
  constructor (day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}



app.listen(PORT, () => console.log('Listening on Port: ', PORT));
