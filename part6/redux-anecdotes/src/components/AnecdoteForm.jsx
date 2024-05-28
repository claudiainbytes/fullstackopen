import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { getNotification } from '../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'
 
const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()  
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        const anecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(anecdote))
        dispatch(getNotification(`New anecdote "${anecdote}" was added.`))
        setTimeout(() => {
            dispatch(getNotification(``))
        }, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
            </form>
        </>
    )
  }
  
  export default AnecdoteForm