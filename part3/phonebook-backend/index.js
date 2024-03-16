require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person') 

const app = express()
app.use(cors())
app.use(express.static('dist'))

let persons = []

app.get('/api/persons', (request, response) => {
  Person
        .find({})
        .then(allPersons => {
          response.json(allPersons)
        })
})

app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify({ "body": req.body }) } )

morgan.token('respon', function (req, res) { return JSON.stringify({ "persons": persons })} )

const customMorgan = ':method :url :status :response-time ms - :res[content-length] :body - :respon'

app.use(morgan(customMorgan))

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
           if(person) {
            response.json(person)
           } else {
            response.status(404).end()
           }
        })
        .catch(err => { 
          console.log(err)
          response.status(400).send({ error: 'malformatted id'})
        } )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateRandomId = () => {
  const randomId = Math.floor((Math.random() * 100) + 1)
  const lastId = Math.max(...persons.map(person => person.id))
  return persons.filter(person => person.id === randomId).length === 0 ? randomId : (lastId + 1) 
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  } 

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  } 
  
  const person = new Person({ 
    name: body.name,
    number: body.number,
  })

  Person
        .findOne({ name: person.name })
        .then(existPerson => {
           if(existPerson !== null) {
            return response.status(403).json({ 
              error: 'name already exists' 
            })
           } else {
            person.save().then(savedPerson => {
              response.json(savedPerson)
            })
           }
            
        })
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    Person
      .countDocuments()
      .then(count => { 
        const message = `<p>Phonebook has info for ${count} people<br/>${ date } </p>`
        response.send(message)
      })
      .catch(err => console.log(err)) 
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
