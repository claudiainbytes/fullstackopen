const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)     
})

blogsRouter.post('/', async (request, response, next) => {
   
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

    /*
    Blog
        .findOne({ title })
        .then(existTitle => {
            if(existTitle) {
                return response.status(403).json({
                error: 'title already exists'
            })
            } else {
                const blog = new Blog( { title, author, url, likes })
                blog
                    .save()
                    .then(savedBlog => {
                        response.status(201).json(savedBlog)
                    })
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error))*/
     
    const existTitle = await Blog.findOne({title}).catch(error => next(error))
    if(existTitle){
        return response.status(403).json({
            error: 'title already exists'
        })
    } else {
        const blog = new Blog( { title, author, url, likes })
        const savedBlog = await blog.save().catch(error => next(error))
        response.status(201).json(savedBlog)
    }

})

module.exports = blogsRouter