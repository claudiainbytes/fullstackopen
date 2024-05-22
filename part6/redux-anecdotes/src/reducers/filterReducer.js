import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
        const content = action.payload
        return content.toLowerCase()
    }
  },
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer