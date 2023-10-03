import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookServices from "./services/phonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    phonebookServices.fetchAllPeople().then((response) => {
      setPersons(response.data);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    const copy = [...persons];
    phonebookServices.addPerson(newPerson).then((response) => {
      console.log("Stored correctly");
    });
    setPersons(copy.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        setSearch={setSearch}
      />
      <h3>add a new contact</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        search={search}
        persons={persons}
      />
    </div>
  );
};

export default App;
