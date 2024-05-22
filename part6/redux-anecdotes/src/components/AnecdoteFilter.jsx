import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'
import { getNotification } from '../reducers/notificationReducer'

const AnecdoteFilter = () => {
    
    const dispatch = useDispatch()

    const handleFilterAnecdotes = (e) => {
        const filter = e.target.value
        dispatch(filterAnecdotes(filter))
        dispatch(getNotification(`Filter by: ${filter}`))
        setTimeout(() => {
            dispatch(getNotification(``))
        }, 5000)
    }

    return (
        <>
            <div>filter<input name="filter" onChange={handleFilterAnecdotes}/></div><br/>
        </>
    )
  }
  
  export default AnecdoteFilter