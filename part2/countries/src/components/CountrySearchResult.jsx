import { useState, useEffect } from "react";
import CountryProfile from "./CountryProfile";
import CountryMatches from "./CountryMatches";
import restcountries from "../services/restcountries";

// This component is responsible for displaying the search results based on the number of countries found.
// countries is an array of country names.
function CountrySearchResult({ countries }) {
  const [countryInfo, setCountryInfo] = useState(null);

  // If the searchResult has only one element, get the country info from restcountries API.
  useEffect(() => {
    if (countries.length === 1) {
      restcountries
        .getByName(countries[0])
        .then((data) => setCountryInfo(data))
        .catch((error) => window.alert(error));
    } else {
      setCountryInfo(null);
    }
  }, [countries]);

  // If the countries array is null, return a loading message.
  if (countries.length === 0) {
    return null;
  } else if (countries.length === 1) {
    if (!countryInfo) {
      return <div>loading</div>;
    }
    // If the countryInfo is not null, return the country profile.
    return <CountryProfile info={countryInfo} />;
  } else if (countries.length <= 10) {
    return <CountryMatches countries={countries} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
}

export default CountrySearchResult;
