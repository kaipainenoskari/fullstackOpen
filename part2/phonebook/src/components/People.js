import service from '../services/persons'

const People = ({persons, setPersons, people, setPeople}) => {
  const deleteNumber = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service.remove(person.id).then(() => {
        setPersons(persons.filter(a => a.id !== person.id))
        setPeople(people.filter(a => a.id !== person.id))
      })
    }
  }

    return (
      people.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteNumber(person)}>delete</button></div>)
    )
  }

export default People