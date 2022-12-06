require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

app.get('/', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then((persons) => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
        )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(errorHandler)

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const pers = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 50000)
    })

    pers.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const pers = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, pers, {new: true})
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})