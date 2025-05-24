// openweathermap API doc: https://openweathermap.org/current
import axios from "axios";

// Export the environment variable VITE_OPENWEATHERMAP_API_KEY before starting the app
// Or set it in the .env file: VITE_OPENWEATHERMAP_API_KEY=your_api_key
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
if (!apiKey) {
  throw new Error("OpenWeatherMap API key is not defined");
}
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

// getWeather fetches the weather data for a given city
function getWeather(city) {
  const request = axios.get(`${baseUrl}&q=${city}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("City not found");
    }
  });
}

// getWeatherIconUrl constructs the URL for the weather icon based on the icon code
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export default { getWeather, getWeatherIconUrl };
