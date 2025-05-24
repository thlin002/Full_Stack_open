import { useEffect, useState } from "react";
import openweathermap from "../services/openweathermap";
import WeatherInfo from "./WeatherInfo";

// This component is responsible for displaying the country profile.
function CountryProfile({ info }) {
  const [weatherOfCapitals, setWeatherOfCapitals] = useState(null);

  useEffect(() => {
    // If the info object has a capital property, fetch the weather data for each capital city.
    // The capital property is an array of capital cities.
    if (!info.capital) {
      return;
    }

    setWeatherOfCapitals([]);
    for (const city of info.capital) {
      // Fetch the weather data for the capital cities using the openweathermap service.
      // If the city is not found, catch the error and display a message.
      // The weather data is then passed to the WeatherInfo component to display the weather information.
      openweathermap
        .getWeather(city)
        .then((weatherData) => {
          setWeatherOfCapitals((list) =>
            list.concat(
              <WeatherInfo key={city} weatherData={{ city, ...weatherData }} />,
            ),
          );
        })
        .catch((error) => {
          setWeatherOfCapitals((list) =>
            list.concat(
              <div key={city}>
                Weather info of <b>{city}</b> not found. (Error message:{" "}
                {error.message})
              </div>,
            ),
          );
        });
    }
  }, [info.capital]);

  // Get the languages from the info object and map them to a list of <li> elements.
  let languageList = Object.values(info.languages).map((lang) => (
    <li key={crypto.randomUUID()}>{lang}</li>
  ));

  // If the capital property is not found, display message "Info not found".
  return (
    <div>
      <h1>{info["name"]["common"]}</h1>
      <div>
        Capital:{" "}
        {info["capital"] ? info["capital"].join(", ") : "Info not found"}
      </div>
      <div>Area: {info["area"]}</div>
      <h2>Languages</h2>
      <ul>{languageList}</ul>
      <img src={info.flags.png} />
      {weatherOfCapitals}
    </div>
  );
}

export default CountryProfile;
