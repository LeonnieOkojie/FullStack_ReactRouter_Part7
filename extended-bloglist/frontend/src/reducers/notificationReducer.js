import { createSlice } from "@reduxjs/toolkit"

// Initial state for the notification, with empty message and type
const initialState = {
    message: '',
    type: '', // could be a 'success', 'error', 'info'
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // This sets the notification message and type
        setNotification(state, action) {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        // This clears the notification
        clearNotification(state) {
            state.message = ''
            state.type = ''
        },
    },
})

export const { setNotification, clearNotification } = notificationSlice.actions

// This is used to show notification and auto-clear it after timeout
export const showNotification = (message, type, timeout) => {
    return (dispatch) => {
        dispatch(setNotification({ message, type }))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer