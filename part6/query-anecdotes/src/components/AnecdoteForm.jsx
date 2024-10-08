import { useContext } from 'react'
import NotificationContext from './../context/NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from './../requests'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
          mutationFn: createAnecdote,
          onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
          },
          onError: (error, variables, context) => {
            dispatch({ type: "REJECTED" })
            setTimeout(() => {
              dispatch({ type: "EMPTY" })
            }, 5000)
          }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "CREATE", payload: content })
    setTimeout(() => {
      dispatch({ type: "EMPTY" })
    }, 5000)    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
