import { createSlice } from "@reduxjs/toolkit";
// Importing blog-related services (API calls)
import blogService from "../services/blogs"
import axios from "axios";

const blogSlice = createSlice({
    name: 'blogs', // Name of this slice
    initialState: [], // Initial state is an empty array
    reducers: {
        // Set the blogs state with data from backend
        getBlogs: (state, action) => {
            return action.payload
        },
        // Add a new blog to the state
        addToBlogs: (state, action) => {
            state.push(action.payload)
        },
        // Update an existing blog (e.g. after liking)
        updateBlogs: (state, action) => {
            const id = action.payload.id
            return state.map(blog => 
                blog.id !== id ? blog : action.payload
            )
        },
        // Remove a blog from the state
        deleteBlogs: (state, action) => {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

// Exporting the actions so we can dispatch them elsewhere
export const { getBlogs, addToBlogs, updateBlogs, deleteBlogs, setComments } = blogSlice.actions

// Fetch all blogs from backend and set to state
export const initialBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(getBlogs(blogs))
    }
}

// Create a new blog and add to state
export const addBlogs = (newObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch(addToBlogs(newBlog))
    }
}

export const handleLike = (id) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const likeblog = blogs.find(blog =>  blog.id === id)
        const newLikes = {
            ...likeblog,
            likes: likeblog.likes + 1,
            user: likeblog.user.id
        }
        const updateLikes = await blogService.update(id, newLikes)
        dispatch(updateBlogs(updateLikes))
    }
}

export const handleRemove = (id) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const removeBlog = blogs.find(blog => blog.id === id)
        await blogService.remove(id)
        dispatch(deleteBlogs(removeBlog))
    }
}

// Add a comment to a blog post and dispatch to update state
export const handleComment = ({ id, comment }) => {
    return async (dispatch) => {
        try {
            // Send the new comment to the backend
            await axios.post(`/api/blogs/${id}/comments`, { comment })

            // Dispatch an action to update the Redux store
            dispatch({
                type: 'ADD_COMMENT',
                data: { id, comment },
            })
        } catch (error) {
            console.error('Error adding comment:', error)
            throw error
        }
    }
}

export default blogSlice.reducer