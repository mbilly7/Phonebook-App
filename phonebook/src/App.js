import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './Filter'
import SuccessNotification from './SuccessNotification'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/personsService.js'
import ErrorNotification from './ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`The number of ${returnedPerson.name} was successfully added.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = (event, idForDeletion, nameForDeletion) => {
    if (window.confirm(`Are you sure you want to delete ${nameForDeletion}`)) {
      personsService
          .deletePerson(idForDeletion)
          .then(() => {
            setPersons(persons.filter(person => person.id !== idForDeletion))
      })
    }
  }

  return (
    <div>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <h3>Add new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} handleDelete={handleDelete}/>
    </div>
  )
}

export default App