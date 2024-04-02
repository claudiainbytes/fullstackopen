import { useState, useEffect, useRef } from 'react'
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
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsername = ({ target }) => setUsername(target.value)

  const handlePassword = ({ target }) => setPassword(target.value)

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
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <BlogForm blogs={blogs} setMessage={setMessage} setBlogs={setBlogs} blogFormRef={blogFormRef}/> 
        </Togglable>
      )}
      { user !== null && ( 
            <BlogList blogs={blogs} setMessage={setMessage} setBlogs={setBlogs}/> 
      )}
    </div>
  )
}

export default App