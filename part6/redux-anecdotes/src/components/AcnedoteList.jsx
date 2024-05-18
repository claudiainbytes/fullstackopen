import { useSelector, useDispatch } from 'react-redux'
import { voteByID } from '../reducers/anecdoteReducer'

const AcnedoteList = () => { 
    const anecdotes = useSelector(state => state.anecdotes )
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteByID(id))
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
  
export default AcnedoteList