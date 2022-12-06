import noteService from '../services/persons'

const PersonForm = (p) => {
    const showError = (message) => {
      p.setErrorMessage(message)

      setTimeout(() => {
        p.setErrorMessage(null)
      }, 4000)
    }

    const addPerson = event => {
      event.preventDefault()
      if (p.newName !== '' && p.newNumber !== '') {
        const person = {
          name: p.newName,
          number: p.newNumber
        }
        if (!p.persons.every(a => a.name !== p.newName)) {
          if (window.confirm(`${p.newName} is already added to phonebook, replace the old number with a new one?`)) {
            const findPerson = p.persons.find(n => n.name === person.name)
            noteService.update(findPerson.id, person).then((updatedPerson) => {
              p.setPersons(p.persons.filter(a => a.name !== updatedPerson.name).concat(updatedPerson))
              p.setPeople(p.people.filter(a => a.number !== findPerson.number).concat(updatedPerson))
              showError(`sAdded ${updatedPerson.name}`)
              p.setNewName('')
              p.setNewNumber('')
              p.setFilter('')
              p.setPeople([])
            }).catch(error => {
              showError(`eInformation of ${person.name} has already been removed from server`)
            })
          }
        }
        else {
          noteService.create(person).then((createdPerson) => {
            p.setPersons(p.persons.concat(createdPerson))
            showError(`sAdded ${createdPerson.name}`)
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