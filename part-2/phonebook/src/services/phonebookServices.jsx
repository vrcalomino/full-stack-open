import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const fetchAllPeople = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

export default {
  fetchAllPeople,
  addPerson,
};
