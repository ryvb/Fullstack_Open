import { useState } from 'react'

const Nums = ( {persons} ) => {
  console.log(persons)

  return (
    <div>
      {persons.map(persons => <p key={persons.name}>
        {persons.name} {persons.number}
      </p>)}
    </div>
  )
}

const Filtering = ( {f, handleInputChange} ) => {
  return (
    <div>filter shown with <input type='text' value={f} onChange={handleInputChange}/></div>
  )
}

const PersonForm = ( {addName, newName, handleNameChange, newNumber, handleNumberChange} ) => {
  return (
    <form onSubmit={addName}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [f, setF] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)

    const included = persons.some(person => person.name === personObject.name)
      
    if (included) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setFilteredPersons(filteredPersons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputChange = (event) => {
    const searchTerm = event.target.value
    setF(searchTerm)

    const filteredItems = persons.filter((person => person.name.toLowerCase().includes(searchTerm.toLowerCase())))
    setFilteredPersons(filteredItems)

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filtering f={f} handleInputChange={handleInputChange}/>
      
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Nums persons={filteredPersons}/>
    </div>
  )
}

export default App