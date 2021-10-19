'use strict';

const axios = require('axios');


async function handleMovies(request, response) {
  let { city } = request.query;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=1&query=${city}`;
  try {
    let movieData = await axios.get(movieUrl);
    // console.log(movieData.data);
    let movieResults = movieData.data.results;
    console.log(movieResults);
    let movieObjects = movieResults.map(oneMovie => new Movie(oneMovie));
    response.status(200).send(movieObjects);
  }
  catch (error) {
    response.status(500).send('unable to find movie information');
  }
}

class Movie {
  constructor(oneMovie) {
    this.title = oneMovie.title;
    this.overview = oneMovie.overview;
    this.average_votes = oneMovie.vote_average;
    this.image = 'https://image.tmdb.org/t/p/w500/' + oneMovie.poster_path;
    this.popularity = oneMovie.popularity;
    this.release_date = oneMovie.release_date;
  }
}

module.exports = handleMovies;