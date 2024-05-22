import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { getNotification } from '../reducers/notificationReducer'
 
const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()  
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
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