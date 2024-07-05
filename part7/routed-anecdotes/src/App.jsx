import { useState } from 'react'
import { useField } from './hooks'

import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

import Menu from './components/Menu'
import NotificationMessage from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'

const App = () => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState({ message: '', classname: 'success' })

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification({ message: `a new anecdote ${anecdote.content} was created`, classname: 'success' })
    setTimeout(() => {
      setNotification({ message: '', classname: 'sucess' })
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      { notification.message.length > 0
          ? <NotificationMessage message={notification} />
          : <></>
      }
      <Routes>
        <Route path="/anecdotes/:id" element={ <Anecdote anecdote={anecdote} />} />
        <Route path="/anecdotes" element={ <AnecdoteList anecdotes={anecdotes} /> } />
        <Route path="/about" element={ <About />} />
        <Route path="/create" element={ <CreateNew addNew={addNew} content={content} author={author} info={info} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App


/*
  setMessage({ message: error.response.data.error, classname:'error' })
            setTimeout(() => {
              setMessage(null)
            }, 5000)

*/