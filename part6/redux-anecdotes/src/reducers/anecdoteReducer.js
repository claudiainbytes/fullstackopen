import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from './../services/anecdotes'

const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
        const anecdote = action.payload
        state = state.map(a => (a.id === anecdote.id) ? anecdote : a)
        state = orderByVotes(state)
        return state
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdotes, incrementVote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = objAnecdote => {
  return async dispatch => {
    const votes = objAnecdote.votes + 1
    const anecdote = await anecdoteService.updateVotes(objAnecdote.id, {...objAnecdote, votes})
    dispatch(incrementVote(anecdote))
  }
}

export default anecdotesSlice.reducer