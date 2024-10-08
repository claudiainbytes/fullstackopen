const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { error } = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if ((username === undefined) || (username.length < 3)) {
        return response.status(400).json({
        error: 'username is missing'
        })
    }

    if ((password === undefined) || (password.length < 3)) {
        return response.status(400).json({
        error: 'password is missing'
        })
    }

    const existUsername = await User.findOne({username})
    if(existUsername){
        return response.status(403).json({
            error: 'username must be unique'
        })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { id: 1, title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
})

module.exports = usersRouter