import { useSelector, useDispatch } from 'react-redux'
import { voteByID } from './reducers/anecdoteReducer'
import AcnedoteForm from './components/AcnedoteForm'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteByID(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AcnedoteForm/>
    </div>
  )
}

export default App