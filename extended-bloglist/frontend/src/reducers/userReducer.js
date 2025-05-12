import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // This reducer sets the users in the state using the data from the action payload
        getUsers: (state, action) => {
            return action.payload
        }
    }
})

export const { getUsers } = userSlice.actions

// This function fetches all users from the backend and dispatches the action to set
export const initialUser = () => {
    return async dispatch => {
        // Fetch users from the API using the user service
        const users = await userService.users()
        dispatch(getUsers(users))
    }
}

export default userSlice.reducer