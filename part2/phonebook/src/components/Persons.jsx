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

export default Persons
