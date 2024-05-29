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

export const setNotification = message => {
  return dispatch => {
    dispatch(getNotification(message))
    setTimeout(() => {
      dispatch(getNotification(``))
    }, 5000)
  }
}

export default notificationSlice.reducer