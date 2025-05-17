import CountryDisplay from "./CountryDisplay";

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
