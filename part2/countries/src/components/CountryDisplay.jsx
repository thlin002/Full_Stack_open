import { useState } from "react";
import CountryProfile from "./CountryProfile";
import restcountries from "../services/restcountries";

// This component is responsible for displaying the country name and a button to show/hide the country profile.
function CountryDisplay({ country }) {
  const [countryInfo, setCountryInfo] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  // This function handles the button click event.
  const handleClick = () => {
    if (buttonClicked) {
      // If the button is clicked again, it hides the country profile.
      setButtonClicked(false);
      return;
    } else {
      // If the countryInfo is null, it fetches the country info from restcountries API.
      if (!countryInfo) {
        restcountries
          .getByName(country)
          .then((data) => setCountryInfo(data))
          .catch((error) => window.alert(error));
      }
      // Show the country profile.
      setButtonClicked(true);
    }
  };

  // If the countryInfo is null, display a loading message.
  // Otherwise, display the CountryProfile component with the fetched country info.
  const displayCountryProfile = countryInfo ? (
    <CountryProfile info={countryInfo} />
  ) : (
    <div>loading</div>
  );

  // Display the country profile if the button is clicked.
  // Otherwise, just display the country name and the button.
  return (
    <div>
      {country + " "}
      <button type="button" onClick={handleClick}>
        {buttonClicked ? "Hide" : "Show"}
      </button>
      {buttonClicked && displayCountryProfile}
    </div>
  );
}

export default CountryDisplay;
