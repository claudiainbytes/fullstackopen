import { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const isPersonExist = (name) => persons.find((person) => person.name === name.trim()) ? true : false

  const isPersonNumberExist = (number) => persons.find((person) => person.number === number.trim()) ? true : false 
  
  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault()
    if (isPersonExist(newName)) {
     alert(`${newName} is already added to phonebook`)
    } else if(isPersonNumberExist(newNumber)) {
        alert(`${newNumber} is already added to phonebook`)
    } else {
      if ((newName.length > 0) && ( newNumber.length > 0)) {
        const newPerson = { name: newName, number: newNumber }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:  <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number:  <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      { persons.map((person) => <Person key={person.name} person={person}/> ) }
      </ul>
    </div>
  )
}

export default App