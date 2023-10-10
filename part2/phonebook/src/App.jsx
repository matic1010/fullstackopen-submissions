import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPeople) => setPersons(initialPeople));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const names = persons.map((person) => person.name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const personToAdd = {
      name: newName,
      number: newNumber,
    };

    personService.create(personToAdd).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;
    personService.remove(id);
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} filter={filter} />
      <h3>Add a new Contact</h3>
      <PersonForm
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onClick={deletePerson} />
    </div>
  );
};

export default App;
