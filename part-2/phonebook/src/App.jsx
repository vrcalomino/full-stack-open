import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phonebookServices from "./services/phonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    phonebookServices.fetchAllPeople().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleDeletion = (personId) => {
    phonebookServices
      .deletePerson(personId)
      .then((response) => {
        const newPersons = persons.filter((person) => person.id !== personId);
        setPersons(newPersons);
      })
      .catch((error) => {
        setErrorMessage(`Data was erased already!`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };
    if (found) {
      if (window.confirm(`Do you want to change ${newName} number?`)) {
        phonebookServices
          .changeNumber(found.id, newPerson)
          .then((response) => {
            setSuccessMessage(`Changed ${newName} number succesfully!`);
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
            const updatedPersons = persons.map((person) => {
              if (person.name === newName) {
                return { ...person, number: newNumber };
              }
              return person;
            });
            setPersons(updatedPersons);
          })
          .catch((error) => {
            setErrorMessage(`${newName} data was erased already!`);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    const copy = [...persons];
    phonebookServices.addPerson(newPerson).then((response) => {
      setPersons(copy.concat(response.data));
      setSuccessMessage(`Added ${newName} succesfully!`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    });
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={successMessage}
        className="success"
      />
      <Notification
        message={errorMessage}
        className="error"
      />
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
