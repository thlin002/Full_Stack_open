import { useState, useEffect } from "react";
import CountrySearchResult from "./components/CountrySearchResult";
import restcountries from "./services/restcountries";

function App() {
  const [filter, setFilter] = useState("");
  const [countryList, setCountryList] = useState(null);
  const [matchList, setMatchList] = useState(null);

  // This function handles the filter change event.
  // It updates the filter state with the value from the input field.
  let handleFilterChange = (e) => {
    let filterStr = e.target.value;
    setFilter(filterStr);
  };

  // Update the matchList whenever the filter or countryList changes.
  useEffect(() => {
    // If countryList is null, do not proceed with filtering.
    if (countryList) {
      // If filter is empty string, assign queryResult an empty array.
      setMatchList(
        filter
          ? countryList.filter((country) =>
              country.toLowerCase().includes(filter.toLowerCase()),
            )
          : [],
      );
    }
  }, [filter, countryList]);

  // Get and set the Country List after the initial rendering.
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

  // If the matchList is null, display a loading message.
  return (
    <>
      <label>
        find countries <input value={filter} onChange={handleFilterChange} />
      </label>
      {matchList ? (
        <CountrySearchResult countries={matchList} />
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default App;
