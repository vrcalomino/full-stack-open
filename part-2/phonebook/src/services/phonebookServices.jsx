import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const fetchAllPeople = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export default {
  fetchAllPeople,
  addPerson,
  deletePerson,
};
