// This component is responsible for displaying the country profile.
function CountryProfile({ info }) {
  // If the info is null, return a loading message.
  if (!info) {
    return <div>loading</div>;
  }
  // If the info is not empty, return the country profile.
  // Get the languages from the info object and map them to a list of <li> elements.
  let languageList = Object.values(info.languages).map((lang) => (
    <li key={crypto.randomUUID()}>{lang}</li>
  ));

  return (
    <div>
      <h1>{info["name"]["common"]}</h1>
      <div>Capital {info["capital"].join(", ")}</div>
      <div>Area {info["area"]}</div>
      <h2>Languages</h2>
      <ul>{languageList}</ul>
      <img src={info.flags.png} />
    </div>
  );
}

export default CountryProfile;
