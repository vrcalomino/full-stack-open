import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "030-12312" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
    setPersons(copy.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>
            number:{" "}
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons !== null
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : null}
    </div>
  );
};

export default App;
