import openweathermap from "../services/openweathermap";

// This component is responsible for displaying the weather information.
function WeatherInfo({ weatherData }) {
  // Destructure the weatherData object to get the city, weather list, main data, and wind data.
  const { city, weather: weatherList, main, wind } = weatherData;

  // Display the weather icons for each weather condition in the weather list.
  const weatherDisplay = weatherList.map((weather) => (
    <img
      key={city + weather.main}
      src={openweathermap.getWeatherIconUrl(weather.icon)}
      alt={weather.main}
    />
  ));

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {main.temp}°C</p>
      {weatherDisplay}
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
}
export default WeatherInfo;
