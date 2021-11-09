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

// async function handleMovie(request, response) {
//   let { city } = request.query;
//   let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=1&query=${city}`;
//   try {
//     let movieData = await axios.get(movieUrl);
//     // console.log(movieData.data);
//     let movieResults = movieData.data.results;
//     // console.log(movieResults);
//     let movieObjects = movieResults.map(oneMovie => new Movie(oneMovie));
//     response.status(200).send(movieObjects);
//   }
//   catch (error) {
//     response.status(500).send('unable to find movie information');
//   }
// }

// async function handleWeather(request, response) {
//   let { lat, lon } = request.query;
//   let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&units=I&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
//   try {
//     let weatherData = await axios.get(weatherUrl);
//     let weatherObject = weatherData.data;
//     const weatherArray = weatherObject.data.map(day => new Forecast(day));
//     response.status(200).send(weatherArray);
//   }
//   catch (error) {
//     response.status(500).send('Unable to get Forecast');
//   }
//   response.status(200).send('weather route works');
// }

// class Forecast {
//   constructor(day) {
//     this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
//     this.date = day.valid_date;
//   }
// }

// class Movie {
//   constructor(oneMovie) {
//     this.title = oneMovie.title;
//     this.overview = oneMovie.overview;
//     this.average_votes = oneMovie.vote_average;
//     this.image = 'https://image.tmdb.org/t/p/w500/' + oneMovie.poster_path;
//     this.popularity = oneMovie.popularity;
//     this.release_date = oneMovie.release_date;
//   }
// }

app.listen(PORT, () => console.log('Listening on Port: ', PORT));
