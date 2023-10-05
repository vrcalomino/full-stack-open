import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  return axios.get(`${baseUrl}api/all`);
};

const searchCountry = (search) => {
  return axios.get(`${baseUrl}api/name/${search}`);
};

export default {
  getAll,
  searchCountry,
};
