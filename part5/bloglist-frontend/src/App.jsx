import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "", likes: 0 })
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  //const [createBlogVisible, setCreateBlogVisible] = useState(false)

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

  const handleUsername = ({ target }) => setUsername(target.value)

  const handlePassword = ({ target }) => setPassword(target.value)

  const handleBlogTitle = ({ target }) => setNewBlog({ ...newBlog, title: target.value })

  const handleBlogAuthor = ({ target }) => setNewBlog({ ...newBlog, author: target.value })

  const handleBlogURL = ({ target }) => setNewBlog({ ...newBlog, url: target.value })

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

  const handleAddBlog = (event) => {
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

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={message} />
      { user === null && (
            <LoginForm 
                handleLogin={handleLogin} 
                handleUsername={handleUsername} 
                handlePassword={handlePassword} 
                username={username} 
                password={password}
             /> 
      )}
      { user !== null && ( 
            <LogoutForm 
                user={user} 
                handleLogout={handleLogout} 
            />
      )}
      { user !== null && ( 
        <Togglable buttonLabel="Create blog">
            <BlogForm 
              newBlog={newBlog} 
              handleBlogTitle={handleBlogTitle} 
              handleBlogAuthor={handleBlogAuthor} 
              handleBlogURL={handleBlogURL}
              handleAddBlog={handleAddBlog}
            /> 
        </Togglable>
      )}
      { user !== null && ( 
            <BlogList blogs={blogs}/> 
      )}
    </div>
  )
}

export default App