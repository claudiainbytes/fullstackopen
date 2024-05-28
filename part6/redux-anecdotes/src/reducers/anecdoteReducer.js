import { createSlice, current } from '@reduxjs/toolkit'

const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
        const id = action.payload.id
        const objAnecdote = state.find(a => a.id === id )
        objAnecdote.votes++
        state = orderByVotes(state)
        console.log('state', current(state))
        return state
    },
    createAnecdote(state, action) {
        state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer