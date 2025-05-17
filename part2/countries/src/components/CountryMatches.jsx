import CountryDisplay from "./CountryDisplay";

// This component is responsible for displaying a list of countries and their profiles.
function CountryMatches({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <CountryDisplay key={country} country={country} />
      ))}
    </div>
  );
}

export default CountryMatches;
