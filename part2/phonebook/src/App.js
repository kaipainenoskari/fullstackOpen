import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) return null
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = ({ data }) => {
  const [persons, setPersons] = useState(data) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [people, setPeople] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} setFilter={setFilter} people={people} setPeople={setPeople} persons={persons} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} filter={filter} setFilter={setFilter} people={people} setPeople={setPeople} persons={persons} setPersons={setPersons} errorMessage={setErrorMessage} setErrorMessage={setErrorMessage} />
      <h2>Numbers</h2>
      <People people={people} setPeople={setPeople} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App