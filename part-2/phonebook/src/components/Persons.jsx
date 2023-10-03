const Persons = (props) => {
  return (
    <>
      {props.search.length === 0
        ? props.persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}{" "}
              <button onClick={() => props.handleDeletion(person.id)}>
                delete
              </button>
            </p>
          ))
        : props.persons
            .filter((person) =>
              person.name.toLowerCase().includes(props.search)
            )
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.number}{" "}
                <button onClick={() => props.handleDeletion(person.id)}>
                  delete
                </button>
              </p>
            ))}
    </>
  );
};
export default Persons;
