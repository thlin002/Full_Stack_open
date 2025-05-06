import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'
import Persons from './components/Persons'
import Message from './components/Message'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ content: null, color: null })

  useEffect(() => {
    phonebook.getAll().then(data => setPersons(data))
  }, [])

  const handleRequestError = (response, person = null) => {
    if(response.status === 404 && person) {
      setMessage({ content: `Information of ${person.name} has already been removed from server`, color: 'red' })
      setPersons(persons.filter((p) => p.name !== person.name))
    } else {
      setMessage({ content: 'Error', color: 'red' })
    }
    // Start a timer that will set the errorMessage state to null after five seconds.
    setTimeout(() => setMessage({ content: null, color: null }), 5000)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const deleteContact = (id) => {
    phonebook
      .remove(id)
      .then((removedPerson) => {
        setPersons(persons.filter((person) => person.id !== removedPerson.id))
        setMessage({ content: `Removed ${removedPerson.name}`, color: 'green' })
        setTimeout(() => setMessage({ content: null, color: null }), 5000)
      })
      .catch((response) => handleRequestError(response, persons.find((person) => person.id === id)))
  }

  const addContact = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    const indexFound = persons.findIndex((person) => person.name === personObject.name)
    if (indexFound >= 0) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)){
        phonebook
          .update(persons[indexFound].id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === persons[indexFound].id ? updatedPerson : person))
            setMessage({ content: `Changed ${updatedPerson.name}'s number`, color: 'green' })
            setTimeout(() => setMessage({ content: null, color: null }), 5000)
          })
          .catch((response) => handleRequestError(response, persons[indexFound]))
      }
    } else {
      phonebook
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage({ content: `Added ${newPerson.name}`, color: 'green' })
          setTimeout(() => setMessage({ content: null, color: null }), 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {message.content ? <Message message={message.content} color={message.color} /> : null}
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
      <Persons persons={personsToShow} handleDelete={deleteContact} />
    </div>
  )
}

export default App