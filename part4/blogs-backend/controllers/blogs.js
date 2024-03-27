const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)     
})

blogsRouter.post('/', async (request, response) => {
   
    const { title, author, url, likes } = request.body

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
        const blog = new Blog( { title, author, url, likes })
        const savedBlog = await blog.save()
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