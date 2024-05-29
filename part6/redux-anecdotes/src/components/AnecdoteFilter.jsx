import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteFilter = () => {
    
    const dispatch = useDispatch()

    const handleFilterAnecdotes = (e) => {
        const filter = e.target.value
        dispatch(filterAnecdotes(filter))
        dispatch(setNotification(`Filter by: ${filter}`))
    }

    return (
        <>
            <div>filter<input name="filter" onChange={handleFilterAnecdotes}/></div><br/>
        </>
    )
  }
  
  export default AnecdoteFilter