import noteService from '../services/persons'

const PersonForm = (p) => {
    const showError = (message) => {
      p.setErrorMessage(message)

      setTimeout(() => {
        p.setErrorMessage(null)
      }, 3000)
    }

    const addPerson = event => {
      event.preventDefault()
      if (p.newName !== '' && p.newNumber !== '') {
        const person = {
          name: p.newName,
          number: p.newNumber,
          id: p.persons.length + 1
        }
        if (!p.persons.every(a => a.name !== p.newName)) {
          if (window.confirm(`${p.newName} is already added to phonebook, replace the old number with a new one?`)) {
            const findPerson = p.persons.find(n => n.name === person.name)
            noteService.update(findPerson.id, person).then(() => {
              p.setPersons(p.persons.filter(a => a.name !== person.name).concat(person))
              p.setPeople(p.people.filter(a => a.number !== findPerson.number).concat(person))
              showError(`Added ${person.name}`)
              p.setNewName('')
              p.setNewNumber('')
              p.setFilter('')
              p.setPeople([])
            }).catch(error => {
              showError(`Information of ${person.name} has already been removed from server`)
            })
          }
        }
        else {
          noteService.create(person).then(() => {
            p.setPersons(p.persons.concat(person))
            showError(person.name)
            p.setNewName('')
            p.setNewNumber('')
            p.setFilter('')
            p.setPeople([])
          })
        }
      }
    }
  
    const handleNewName = event => {
      p.setNewName(event.target.value)
    }
    const handleNewNumber = event => {
      p.setNewNumber(event.target.value)
    }
    return (
      <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={p.newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number: <input 
          value={p.newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm