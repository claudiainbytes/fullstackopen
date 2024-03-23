const personasRouter = require('express').Router()
const Person = require('../models/person')

personasRouter.get('/info', async(request, response) => {
    const date = new Date()
    const total = await Person.countDocuments()
    const message = `<p>Phonebook has info for ${total} people<br/>${ date } </p>`
    response.send(message)
  })

personasRouter.get('/', (request, response) => {
    Person
        .find({})
        .then(allPersons => {
        response.json(allPersons)
        })
})

personasRouter.get('/:id', (request, response, next) => {
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

personasRouter.post('/', (request, response, next) => {
    const { name, number } = request.body

    if (name === undefined) {
        return response.status(400).json({
        error: 'name is missing'
        })
    }

    if (number === undefined) {
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

personasRouter.delete('/:id', (request, response, next) => {
    Person
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personasRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body
    const person = { name, number }
    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

module.exports = personasRouter