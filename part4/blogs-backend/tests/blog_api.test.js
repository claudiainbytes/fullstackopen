const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach( async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

test('return the corrent amount of blog post', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
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

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    '5 Agile Estimation Tips'
  )
  expect(blogsAtEnd[0].id).toBeDefined()
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

  const blogsAtEnd = await helper.blogsInDb()
  const likesbycontent =  blogsAtEnd[(helper.initialBlogs.length)]
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

afterAll( async() => {
  await mongoose.connection.close()
})