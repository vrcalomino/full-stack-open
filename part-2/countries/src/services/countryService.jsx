import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  return axios.get(`${baseUrl}api/all`);
};

const searchCountry = (search) => {
  return axios.get(`${baseUrl}api/name/${search}`);
};

const getWeather = (lat, lon, apiKey) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
};

export default {
  getAll,
  searchCountry,
  getWeather,
};
