import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

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

    const personToAdd = {
      name: newName,
      number: newNumber,
    };

    if (names.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Update number?`
        )
      ) {
        const idToUpdate = persons.find((person) => person.name === newName).id;
        updatePerson(idToUpdate, personToAdd);
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personService.create(personToAdd).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      setMessage(`${newPerson.name} was added to the phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const updatePerson = (id, personToUpdate) => {
    personService.update(id, personToUpdate);
    const updatedPersons = persons.map((person) =>
      person.id !== id ? person : personToUpdate
    );
    setPersons(updatedPersons);
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
      <Notification message={message} />
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
