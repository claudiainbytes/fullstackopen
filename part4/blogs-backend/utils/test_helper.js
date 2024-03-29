const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        "username": "root",
        "name": "root",
        "password": "sekret",
    },
    { 
        "username": "hellas",
        "name": "Arto Hellas",
        "password": "arthurhalls"
    },
    {
        "username": "mluukkai",
        "name": "Matti Luukkainen",
        "password": "mtwluken"
    }
]

const initialBlogs = [
    {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7,
    },
    {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5
    },
    {
        "title": "Canonical string reduction",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes": 12,
    },
    {
        "title": "First class tests",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        "likes": 10
    },
    {
        "title": "TDD harms architecture",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        "likes": 0,
    },
    {
        "title": "Type wars",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        "likes": 2
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'John Doe', url: 'https://www.businessinsider.com', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async (qry) => {
  qry = qry !== null ? qry : {}
  const blogs = await Blog.find(qry)
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const userExtractor = async (request) => {
    if(request.token !== null){
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
          return response.status(401).json({ error: 'token invalid' })
      }
      return request['user'] = await User.findById(decodedToken.id)
    }
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb, userExtractor
}