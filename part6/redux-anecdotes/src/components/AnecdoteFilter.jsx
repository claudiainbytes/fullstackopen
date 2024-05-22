import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
    
    const dispatch = useDispatch()

    const handleFilterAnecdotes = (e) => {
        const filter = e.target.value
        dispatch(filterAnecdotes(filter))
    }

    return (
        <>
            <div>filter<input name="filter" onChange={handleFilterAnecdotes}/></div><br/>
        </>
    )
  }
  
  export default AnecdoteFilter