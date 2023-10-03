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

  const handleDeletion = (personId) => {
    phonebookServices.deletePerson(personId).then((response) => {
      const newPersons = persons.filter((person) => person.id !== personId);
      setPersons(newPersons);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };
    if (found) {
      if (window.confirm(`Do you want to change ${newName} number?`)) {
        phonebookServices.changeNumber(found.id, newPerson).then((response) => {
          console.log("Changed number succesfully!");
          const updatedPersons = persons.map((person) => {
            if (person.name === newName) {
              return { ...person, number: newNumber };
            }
            return person;
          });
          setPersons(updatedPersons);
        });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    const copy = [...persons];
    phonebookServices.addPerson(newPerson).then((response) => {
      setPersons(copy.concat(response.data));
      console.log("Stored correctly");
    });
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
        handleDeletion={handleDeletion}
      />
    </div>
  );
};

export default App;
