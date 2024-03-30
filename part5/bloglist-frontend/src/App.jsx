import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "", likes: 0 })
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const isBlogExist = (newBlog) => blogs.find((blog) => (blog.name === newBlog.name && blog.author === newBlog.author)) ? true : false

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage({ message: `Wrong username or password`, classname:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Username &nbsp;</label>
            <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            <label htmlFor="password">Password &nbsp;</label>
            <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()

    if(isBlogExist(newBlog)){
      setMessage({ message: `The blog to add  ${newBlog.title} by ${newBlog.author} exists`, classname:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewBlog({ title: "", author: "", url: "", likes: 0 })
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
            setNewBlog({ title: "", author: "", url: "", likes: 0 })
          })
          .catch(error => {
            setMessage({ message: error.response.data.error, classname:'error' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }
  }

  const blogForm = () => { 
    const { title, author, url } = newBlog
    return(
      <form onSubmit={addBlog}>
        <div>
              <label htmlFor="title">Title &nbsp;</label>
              <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
        </div>
        <div>
              <label htmlFor="author">Author &nbsp;</label>
              <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
        </div>
        <div>
              <label htmlFor="url">URL &nbsp;</label>
              <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
        </div>
        <button type="submit">Create</button>
      </form>  
    )
  } 

  const blogLogout = () => (
    <div>
      <p>Welcome {user.name }&nbsp;<button type="button" onClick={handleLogout}>Logout</button></p>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} 
    </div>
  )
  
  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={message} />
      { user === null && loginForm() }
      { user !== null && blogLogout() }
      { user !== null && blogForm() }
      { user !== null && blogList() }
    </div>
  )
}

export default App