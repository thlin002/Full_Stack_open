import { useState } from "react";
import CountryProfile from "./CountryProfile";
import restcountries from "../services/restcountries";

// This component is responsible for displaying the country name and a button to show/hide the country profile.
function CountryDisplay({ country }) {
  const [countryInfo, setCountryInfo] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    if (buttonClicked) {
      setButtonClicked(false);
      return;
    } else {
      if (!countryInfo) {
        // If the countryInfo is null, get the country info from restcountries API.
        restcountries
          .getByName(country)
          .then((data) => setCountryInfo(data))
          .catch((error) => window.alert(error));
      }
      setButtonClicked(true);
    }
  };

  return (
    <div>
      {country + " "}
      <button type="button" onClick={handleClick}>
        {buttonClicked ? "Hide" : "Show"}
      </button>
      {buttonClicked && <CountryProfile info={countryInfo} />}
    </div>
  );
}

export default CountryDisplay;
