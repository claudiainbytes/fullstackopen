const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://claudiainbytes:${password}@fullstackopen2024.s3dz2se.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=fullstackopen2024`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({ 
    "name": String,
    "number": String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

const app = express()
app.use(cors())
app.use(express.static('dist'))

let persons = []

app.get('/api/persons', (request, response) => {
  Person
        .find({})
        .then(persons => {
          response.json(persons)
        })
})

app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify({ "body": req.body }) } )

morgan.token('respon', function (req, res) { return JSON.stringify({ "persons": res.persons })} )

const customMorgan = ':method :url :status :response-time ms - :res[content-length] :body - :respon'

app.use(morgan(customMorgan))

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)
    if(!person) {
        response.status(404).end()
    } else {
        response.json(person)
    }   
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
  
  if(persons.filter(person => person.name === body.name).length === 1) {
      return response.status(403).json({ 
        error: 'name already exists' 
      })
  } 
  
  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)

})

app.get('/api/info', (request, response) => {
    const date = new Date();
    const message = `<p>Phonebook has info for ${persons.length} people<br/>${ date } </p>`
    response.send(message)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
