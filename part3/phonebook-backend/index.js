require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person') 

morgan.token('body', function (req, res) { return JSON.stringify({ "body": req.body }) } )

const customMorgan = ':method :url :status :response-time ms - :res[content-length] :body'

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(customMorgan))

app.get('/api/info', async(request, response) => {
  const date = new Date()
  const total = await Person.countDocuments() 
  const message = `<p>Phonebook has info for ${total} people<br/>${ date } </p>`
    response.send(message)
})

app.get('/api/persons', (request, response) => {
  Person
        .find({})
        .then(allPersons => {
          response.json(allPersons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
          .findById(request.params.id)
          .then(person => {
            if(person) {
              response.json(person)
            } else {
              response.status(404).end()
            }
          })
          .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (name == undefined) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  } 

  if (number == undefined) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  } 
  
  Person
        .findOne({ name })
        .then(existPerson => {
           if(existPerson) {
            return response.status(403).json({ 
              error: 'name already exists' 
            })
           } else {
            const person = new Person({ name, number })
            person
                .save()
                .then(savedPerson => {
                    response.json(savedPerson)
                })
                .catch(error => next(error))
           }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = { name, number }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
