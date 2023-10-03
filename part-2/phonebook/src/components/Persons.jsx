const Persons = (props) => {
  return (
    <>
      {props.search.length === 0
        ? props.persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : props.persons
            .filter((person) =>
              person.name.toLowerCase().includes(props.search)
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))}
    </>
  );
};
export default Persons;
