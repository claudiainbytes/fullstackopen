import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification(state, action) {
        return action.payload
    }
  },
})

export const { getNotification } = notificationSlice.actions
export default notificationSlice.reducer