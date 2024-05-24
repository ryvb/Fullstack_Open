import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        removeNotification(state, action) {
            const newState = ''
            return newState
        }
    }
})

export const { removeNotification, set } = notificationSlice.actions

export const setNotification = ( notification , time) => {
    return async dispatch => {
      dispatch(set(notification))
      setTimeout(() => {
        dispatch(removeNotification())
    }, time*1000)
    }
}

export default notificationSlice.reducer