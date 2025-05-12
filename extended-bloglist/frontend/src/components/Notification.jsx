import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
    // Get the message and type from the Redux state
    const { message, type } = useSelector((state) => state.notification)

    // If there's no message, don't show anything
    if (!message) {
        return null
    }

    // If there is a message, show it using MUI's Alert component
    // The type (severity) can be 'info', 'success', 'error', etc.
    return (
        <Alert severity={type || 'info'}>
            {message}
        </Alert>
    )
}

export default Notification