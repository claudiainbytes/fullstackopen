import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const persons_db_hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(persons_db_hook, [])

  const isPersonExist = (name) => persons.find((person) => person.name === name.trim()) ? true : false

  const isPersonNumberExist = (number) => persons.find((person) => person.number === number.trim()) ? true : false 
  
  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const filteredPersons = (filterPerson.trim().length === 0 || filterPerson.trim() === '') ? persons : persons.filter((person) => person.name.includes(filterPerson) )

  const handleFilterPersonByNameChange = (event) => {
    setFilterPerson(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (isPersonExist(newName)) {
     alert(`${newName} is already added to phonebook`)
    } else if(isPersonNumberExist(newNumber)) {
        alert(`${newNumber} is already added to phonebook`)
    } else {
      if ((newName.length > 0) && ( newNumber.length > 0)) {
        const newPerson = { 
                            name: newName, 
                            number: newNumber 
                          }
        axios
          .post('http://localhost:3001/persons', newPerson)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })                  
      }
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputName={filterPerson} eventName={handleFilterPersonByNameChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App