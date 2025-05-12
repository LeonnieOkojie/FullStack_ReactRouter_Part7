import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null // No user is logged in at first
    },
    reducers: {
        // Set the user in state after login
        setUser: (state, action) => {
            state.user = action.payload
        },
        // Clear the user from state (for logout)
        clearUser: (state) => {
            state.user = null
        }
    }
})

// Export actions so we can use them elsewhere
export const { setUser, clearUser} = loginSlice.actions

// Handle login process
export const addNewUser = (newUser) => {
    return async dispatch => {
        // Send login request to backend
        const user = await loginService.login(newUser)
        // Save user data in localStorage
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        // Set the token for blog requests
        blogService.setToken(user.token)
        // Save user in Redux state
        dispatch(setUser(user))
    }
}

// Check if user is already logged in from localStorage
export const loggedInUser = () => {
    return dispatch => {
        const loggedInUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}

// Handle logout process
export const loggedOutUser = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedInUser')
        dispatch(clearUser())
        // Clear the token from blogService
        blogService.setToken(null)
    }
}

export default loginSlice.reducer