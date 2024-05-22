import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => { 
    
    const anecdotes = useSelector(state => (state.filter.trim().length === 0 || state.filter.trim() === '') ? state.anecdotes : state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter))
    )
    
    const dispatch = useDispatch()

    const vote = (id) => {
        //console.log('vote', id)
        dispatch(addVote({id}))
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