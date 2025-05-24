import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

// getAll fetches info of all countries
function getAll() {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Countries not found");
    }
  });
}

// getByName fetches the info of a country by its common name
function getByName(commonName) {
  const request = axios.get(`${baseUrl}/name/${commonName}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Country not found");
    }
  });
}

export default { getAll, getByName };
