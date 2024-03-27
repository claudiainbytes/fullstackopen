const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name:'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)

  })

})

describe('adding a new user in db', () => {

    beforeEach( async () => {
        await User.deleteMany({})

        for (let user of helper.initialUsers) {
            const passwordHash = await bcrypt.hash(user.password, 10)
            let userObject = new User({ username: user.username, name: user.name, passwordHash })
            await userObject.save()
        }

    })

    test('reject a user when username is undefined', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = { name:'Shakira Mebarak', password: 'shakmeb' }
        const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('username is missing')

          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('reject a user when username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = { username: 'sh', name:'Shakira Mebarak', password: 'shakmeb' }
        const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('username is missing')

          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('reject a user when password is undefined', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = { username: 'shakira', name:'Shakira Mebarak' }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('password is missing')
           
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('reject a user when password is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = { username: 'shakira', name:'Shakira Mebarak', password: 'sh' }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('password is missing')
           
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toEqual(usersAtStart)
    })
    
})    

afterAll( async() => {
    await mongoose.connection.close()
})