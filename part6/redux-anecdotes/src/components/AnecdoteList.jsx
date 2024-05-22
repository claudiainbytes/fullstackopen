import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { getNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => { 
    
    const anecdotes = useSelector(state => (state.filter.trim().length === 0 || state.filter.trim() === '') ? state.anecdotes : state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter))
    )
    
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(addVote({id}))
        dispatch(getNotification(`You voted "${anecdote.content}" `))
        setTimeout(() => {
            dispatch(getNotification(``))
        }, 5000)
    }
    return(<>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>)
}
  
export default AnecdoteList