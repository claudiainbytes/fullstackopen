const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach( async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})
// Uno
describe('counting records from blogs', () => {
  test('return the corrent amount of blog post', async () => {
    const blogs = await helper.blogsInDb({})
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})
// Dos
describe('testing unique identifier', () => {
  test('unique identifier named as id', async () => {
    const blogs = await helper.blogsInDb({})
    expect(blogs[0].id).toBeDefined()
  })
})
// Tres
describe('adding a new blog', () => {
  
  test('creates a new blog post', async () => {
    const response = await api.post('/api/login').send({ username: helper.initialUsers[2].username, password: helper.initialUsers[2].password })
    const token = response.body.token

    const user = await helper.userExtractor(response.body)

    const newBlog = {
        title: "5 Agile Estimation Tips",
        author: "John Davis",
        url: "https://www.easyagile.com/blog/agile-estimation/",
        likes: 241,
        user: user.id
    } 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb({})

    const contents = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
      '5 Agile Estimation Tips'
    )
    expect(blogsAtEnd[0].id).toBeDefined()
  })

  test('likes property is missing from the request', async () => {
    const response = await api.post('/api/login').send({ username: helper.initialUsers[2].username, password: helper.initialUsers[2].password })
    const token = response.body.token

    const user = await helper.userExtractor(response.body)

    const newBlog = {
        title: "10 Agile Estimation Tips",
        author: "John Davis",
        url: "https://www.easyagile.com/blog/agile-estimation-2/",
        user: user.id
    } 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb({})
    const likesbycontent =  blogsAtEnd[(helper.initialBlogs.length)]
    expect(likesbycontent.likes).toBe(0)

  })

  test('title or url properties are missing from the request data', async () => {
    const response = await api.post('/api/login').send({ username: helper.initialUsers[2].username, password: helper.initialUsers[2].password })
    const token = response.body.token

    const user = await helper.userExtractor(response.body)

    const newBlog = {
        author: "John Davis",
        user: user.id
    } 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /application\/json/)
      .expect(400)

  })
  
})
// Cuatro
describe('deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const response = await api.post('/api/login').send({ username: helper.initialUsers[2].username, password: helper.initialUsers[2].password })
    const token = response.body.token

    const user = await helper.userExtractor(response.body)

    const blogsAtStart = await helper.blogsInDb({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb({})
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const updatedUser = await User.findById(user._id.toString())
    expect(updatedUser.blogs).toHaveLength(user.blogs.length - 1)

  })
})

/*
describe('update likes of a specific blog', () => {
  test('succeeds return an object after update likes', async () => {
    const blogsAtStart = await helper.blogsInDb({})
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      likes: 326
    } 
    
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb({})
    const likesbycontent =  blogsAtEnd[0]
    expect(likesbycontent.likes).toBe(326)

  })
})
*/
afterAll( async() => {
  await mongoose.connection.close()
})