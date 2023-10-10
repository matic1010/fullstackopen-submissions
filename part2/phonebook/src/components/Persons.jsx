const Persons = ({ persons, onClick }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}{" "}
          <button onClick={() => onClick(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
