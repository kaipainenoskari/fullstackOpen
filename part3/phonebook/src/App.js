import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import service from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) return null
  else {
    const m = message.slice(1)
    if (message[0] === 'e') {
      return (
      <div className='error'>
        {m}
      </div>
      )
    }
    else if (message[0] === 's') {
      return (
        <div className='success'>
          {m}
        </div>
      )
    }
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [people, setPeople] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    service.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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