import axios from "axios";

const baseUrl = "https://phonebook-backend-xja0.onrender.com/persons";

const fetchAllPeople = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

const changeNumber = (personId, changedPerson) => {
  return axios.put(`${baseUrl}/${personId}`, changedPerson);
};

export default {
  fetchAllPeople,
  addPerson,
  deletePerson,
  changeNumber,
};
