import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const emptyMessage = { message: '', type: '' }

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(emptyMessage)

  // console.log('render')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addName = event => {
    event.preventDefault()

    if (
      persons.some(
        person => person.name === newName && person.number === newNumber
      )
    ) {
      alert(`${newName} is already added to the phonebook`)
    } else if (
      persons.some(
        person => person.name === newName && person.number !== newNumber
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.name !== newName ? person : returnedPerson
              )
            )
            setInfoMessage({ message: `Updated ${newName}`, type: 'info' })
            setTimeout(() => {
              setInfoMessage(emptyMessage)
            }, 5000)
          })
          .catch(error => {
            setInfoMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error',
            })
            setTimeout(() => {
              setInfoMessage(emptyMessage)
            }, 5000)
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setInfoMessage({ message: `Added ${newName}`, type: 'info' })
        setTimeout(() => {
          setInfoMessage(emptyMessage)
        }, 5000)
      })
    }
  }

  const deleteName = id => {
    const person = persons.filter(person => person.id === id)[0].name
    if (window.confirm(`Delete ${person} ?`)) {
      // console.log(id)
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setInfoMessage({
          message: `Removed ${person}`,
          type: 'info',
        })
        setTimeout(() => {
          setInfoMessage(emptyMessage)
        }, 5000)
      })
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = event => {
    setNameFilter(event.target.value)
  }

  const filteredPersons =
    nameFilter !== ''
      ? persons.filter(person =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        )
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage.message} type={infoMessage.type} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addName}
        valueName={newName}
        valueNumber={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deleteName} />
    </div>
  )
}

export default App
