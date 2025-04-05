import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const Message = ( {message, color} ) => {
  const msgStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={msgStyle}>
      {message}
    </div>
  )
}

const DeleteButton = ( {person, handleDelete} )  => {
  const onClick = () => {
    if(confirm(`Delete ${person.name} ?`)) {
      handleDelete(person.id)
    }
  }
  return (<button onClick={onClick}>delete</button>)
}

const Person = ( {person, handleDelete} ) => {
  return (
    <div >{person.name} {person.number} <DeleteButton person={person} handleDelete={handleDelete} /></div>
  )
}

const Persons = ( {persons, handleDelete} ) => {
  return (
    <>
      {persons.map((person) => <Person key={person.name} person={person} handleDelete={handleDelete} />)}
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