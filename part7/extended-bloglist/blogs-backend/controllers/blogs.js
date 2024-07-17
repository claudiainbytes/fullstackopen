const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)     
})

blogsRouter.post('/', async (request, response) => {
   
    const { title, author, url, likes, userId } = request.body

    if(request.user === undefined){
        response.status(401).json({ error: 'token is missing' })
    }

    const user = request.user

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

    if(request.user === undefined){
        response.status(401).json({ error: 'token is missing' })
    }

    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if(!blog){
        return response.status(404).send({ error: 'blog not found' })
    }

    if(blog.user.toString() === user.id.toString()) {
        let updateUserBlogs = user.blogs.filter(
            (blog) => {
                return blog._id.toString() !== request.params.id
            }
        )
        user.set({ blogs: updateUserBlogs })
        user.save()
        await Blog.findByIdAndDelete(blog.id.toString())
        response.status(204).end() 
    } else {
        response.status(401).json({ error: 'no permission: cannot delete blog' })
    }


    
})

blogsRouter.put('/:id', async (request, response) => {

    if(request.user === undefined){
        response.status(401).json({ error: 'token is missing' })
    }

    const user = request.user

    const { title, author, url, likes } = request.body
    const blog = { title, author, url, likes }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)    
})

module.exports = blogsRouter