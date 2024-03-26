const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [{
  "title": "React patterns",
  "author": "Michael Chan",
  "url": "https://reactpatterns.com/",
  "likes": 7
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
  "likes": 12
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
  "likes": 0
},
{
  "title": "Type wars",
  "author": "Robert C. Martin",
  "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  "likes": 2
}]

beforeEach( async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier named as id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('creates a new blog post', async () => {
  const newBlog = {
      title: "5 Agile Estimation Tips",
      author: "John Davis",
      url: "https://www.easyagile.com/blog/agile-estimation/",
      likes: 241
  } 
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    '5 Agile Estimation Tips'
  )
  expect(response.body[0].id).toBeDefined()
})


test('likes property is missing from the request', async () => {
  const newBlog = {
      title: "10 Agile Estimation Tips",
      author: "John Davis",
      url: "https://www.easyagile.com/blog/agile-estimation-2/"
  } 
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /application\/json/)
    .expect(201)

  const response = await api.get('/api/blogs')
  const likesbycontent =  response.body[(initialBlogs.length)]
  expect(likesbycontent.likes).toBe(0)

})

test('title or url properties are missing from the request data', async () => {
  const newBlog = {
      author: "John Davis",
  } 
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /application\/json/)
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})