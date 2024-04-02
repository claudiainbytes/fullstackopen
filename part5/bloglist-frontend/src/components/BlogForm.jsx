import { useState } from 'react'
import blogService from './../services/blogs'

const BlogForm = ({ blogs, setMessage, setBlogs, sortBlogs, blogFormRef }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const { title, author, url } = newBlog

  const handleBlogTitle = ({ target }) => setNewBlog({ ...newBlog, title: target.value })

  const handleBlogAuthor = ({ target }) => setNewBlog({ ...newBlog, author: target.value })

  const handleBlogURL = ({ target }) => setNewBlog({ ...newBlog, url: target.value })

  const isBlogExist = (newBlog) => blogs.find((blog) => (blog.name === newBlog.name && blog.author === newBlog.author)) ? true : false

  const handleAddBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    if(isBlogExist(newBlog)){
      setMessage({ message: `The blog to add  ${newBlog.title} by ${newBlog.author} exists`, classname:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
    } else {
      const blogObject = newBlog
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setMessage({ message: `A new blog  ${returnedBlog.title} by ${returnedBlog.author} added`, classname:'success' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({ title: '', author: '', url: '', likes: 0 })
          sortBlogs()
        })
        .catch(error => {
          setMessage({ message: error.response.data.error, classname:'error' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    }
  }

  return(
    <form onSubmit={handleAddBlog}>
      <div>
        <label htmlFor="title">Title &nbsp;</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleBlogTitle}
        />
      </div>
      <div>
        <label htmlFor="author">Author &nbsp;</label>
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleBlogAuthor}
        />
      </div>
      <div>
        <label htmlFor="url">URL &nbsp;</label>
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleBlogURL}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm