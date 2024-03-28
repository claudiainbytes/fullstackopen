const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)     
})

blogsRouter.post('/', async (request, response) => {
   
    const { title, author, url, likes, userId } = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if ((title === undefined) || (title.length === 0)) {
        return response.status(400).json({
        error: 'title is missing'
        })
    }

    if ((author === undefined) || (author.length === 0))  {
        return response.status(400).json({
        error: 'author is missing'
        })
    }

    if ((url === undefined) || (url.length === 0)) {
        return response.status(400).json({
        error: 'url is missing'
        })
    }
     
    const existTitle = await Blog.findOne({title})
    if(existTitle){
        return response.status(403).json({
            error: 'title already exists'
        })
    } else {
        const blog = new Blog( { title, author, url, likes, user: user.id })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }

})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end() 
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = { title, author, url, likes }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)    
})

module.exports = blogsRouter