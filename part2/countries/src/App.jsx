import { useState, useEffect } from "react";
import CountrySearchResult from "./components/CountrySearchResult";
import restcountries from "./services/restcountries";

function App() {
  const [filter, setFilter] = useState("");
  const [countryList, setCountryList] = useState(null);
  const [matchList, setMatchList] = useState(null);

  let handleFilterChange = (e) => {
    let filterStr = e.target.value;
    setFilter(filterStr);
  };

  // Update the matchList whenever the filter or countryList changes.
  // This is to handle the case when the user types in the input field and the countryList is not yet fetched.
  useEffect(() => {
    // If filter is empty string, assign queryResult an empty array.
    if (countryList) {
      setMatchList(
        filter
          ? countryList.filter((country) =>
              country.toLowerCase().includes(filter.toLowerCase()),
            )
          : [],
      )
    }
  }, [filter, countryList]);

  // get and set the Country List after the initial rendering.
  useEffect(() => {
    restcountries
      .getAll()
      .then((data) =>
        setCountryList(
          data.map((countryInfo) => countryInfo["name"]["common"]),
        ),
      )
      .catch((error) => window.alert(error));
  }, []);

  return (
    <>
      <label>
        find countries <input value={filter} onChange={handleFilterChange} />
      </label>
      <CountrySearchResult countries={matchList} />
    </>
  );
}

export default App;
