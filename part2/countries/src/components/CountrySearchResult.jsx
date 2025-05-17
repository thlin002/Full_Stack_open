import { useState, useEffect } from "react";
import CountryProfile from "./CountryProfile";
import CountryMatches from "./CountryMatches";
import restcountries from "../services/restcountries";

// This component is responsible for displaying the search results based on the number of countries found.
function CountrySearchResult({ countries }) {
  const [countryInfo, setCountryInfo] = useState(null);

  // If the searchResult has only one element, get the country info from restcountries API.
  useEffect(() => {
    if (countries && countries.length === 1) {
      restcountries
        .getByName(countries[0])
        .then((data) => setCountryInfo(data))
        .catch((error) => window.alert(error));
    } else {
      setCountryInfo(null);
    }
  }, [countries]);

  if (!countries) {
    return <div>loading</div>;
  } else if (countries.length === 0) {
    return <div></div>;
  } else if (countries.length === 1) {
    return <CountryProfile info={countryInfo} />;
  } else if (countries.length <= 10) {
    return <CountryMatches countries={countries} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
}

export default CountrySearchResult;
