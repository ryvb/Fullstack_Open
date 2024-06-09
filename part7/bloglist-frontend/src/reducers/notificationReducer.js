import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            const newState = ''
            return newState
        }
    }
})

export const { removeNotification, set } = notificationSlice.actions

export const setNotification = ( notification ) => {
    return async dispatch => {
        dispatch(set(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer