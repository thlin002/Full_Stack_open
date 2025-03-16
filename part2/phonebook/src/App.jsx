import { useState } from 'react'

const Persons = ( {persons} ) => {
  return (
    <>
      {persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <label>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </label>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App