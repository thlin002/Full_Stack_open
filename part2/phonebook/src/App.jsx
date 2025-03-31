import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const Person = ( {person} ) => {
  return (
    <div >{person.name} {person.number}</div>
  )
}

const Persons = ( {persons} ) => {
  return (
    <>
      {persons.map((person) => <Person key={person.name} person={person}/>)}
    </>
  )
}

const Filter = ( {value, onChange} ) => {
  return (
    <label>
    filter shown with <input value={value} onChange={onChange} />
    </label>
  )
}

const PersonForm = ( {onSubmit, newName, newNumber, onNameChange, onNumberChange} ) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebook.getAll().then(data => setPersons(data))
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const addContact = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    if (persons.findIndex((person) => person.name === personObject.name) >= 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    phonebook
      .create(personObject)
      .then(newPerson => setPersons(persons.concat(newPerson)))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addContact}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App