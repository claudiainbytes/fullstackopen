import { useState, useEffect } from 'react'
import personService from './services/person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [message, setMessage] = useState(null)

  const persons_db_hook = () => {
     personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
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
  
  const updatePerson = (name, newNumber) => {
    const currentPerson = persons.find((person) => person.name === name.trim())
    if (newNumber.length > 0) {
      const changePerson = { 
                          ...currentPerson, 
                          number: newNumber 
                        }                
      personService
        .update(currentPerson.id, changePerson)
        .then( modifiedPerson => {
          setMessage({ message: `Updated ${modifiedPerson.name} which new phone number is ${modifiedPerson.number}`, classname:'success' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== currentPerson.id ? person: modifiedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch( error => {
            setMessage({ message: `Information of ${currentPerson.name} has already been removed from server`, classname:'error' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== currentPerson.id))
          }
        )                    
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (isPersonExist(newName)) {
     if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updatePerson(newName, newNumber)
     } else {
      setNewName('')
     }
    } else if(isPersonNumberExist(newNumber)) {
        alert(`${newNumber} is already added to phonebook`)
    } else {
      if ((newName.length > 0) && ( newNumber.length > 0)) {
        const newPerson = { 
                            name: newName, 
                            number: newNumber 
                          }
        personService
          .create(newPerson)
          .then( createdPerson => {
            setMessage({ message: `Added ${createdPerson.name}`, classname:'success' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
          })                    
      }
    } 
  }

  const deletePerson = person => {
    if(confirm(`Delete ${person.name}?`)){
        personService
          .deleteP(person)
          .then( message => {
            setMessage({ message: `${person.name} has been deleted`, classname:'success' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })             
          .catch( error => {
              setMessage({ message: `Information of ${person.name} has already been removed from server`, classname:'error' })
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            }
          )            
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter inputName={filterPerson} eventName={handleFilterPersonByNameChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App