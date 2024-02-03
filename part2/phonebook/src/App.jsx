import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Nums = ( {persons, del} ) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>
        {person.name} {person.number} <button onClick={() => del(person.id)}>delete</button>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [f, setF] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons => {
        setPersons(initalPersons)
        setFilteredPersons(initalPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const included = persons.some(person => person.name === personObject.name)
      
    if (included) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updateNum = persons.filter(person => person.name === personObject.name)

        personService
          .update(updateNum[0].id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== updateNum[0].id ? person : returnedPerson))
            setFilteredPersons(persons.map(person => person.id !== updateNum[0].id ? person : returnedPerson))
          })
      }

    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(filteredPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

      }
  }

  const del = (id) =>{
    const delPerson = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${delPerson.name} ?`)) {
      const updatedPerson = persons.filter(person => person.id !== id)

      personService
        .delName(id)
      setPersons(updatedPerson)
      setFilteredPersons(updatedPerson)
    }
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
      <Nums persons={filteredPersons} del={del}/>
    </div>
  )
}

export default App

/*
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updateNum[0].id ? person : returnedPerson))
            setFilteredPersons(persons)
          })

*/