
async function handleWeather(request, response) {
  let { lat, lon } = request.query;
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&units=I&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
  try {
    let weatherData = await axios.get(weatherUrl);
    let weatherObject = weatherData.data;
    const weatherArray = weatherObject.data.map(day => new Forecast(day));
    response.status(200).send(weatherArray);
  }
  catch (error) {
    response.status(500).send('Unable to get Forecast');
  }
  response.status(200).send('weather route works');
}

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

module.exports = weatherData