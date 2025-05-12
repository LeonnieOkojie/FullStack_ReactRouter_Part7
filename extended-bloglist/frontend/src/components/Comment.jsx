import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { handleComment } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"
import { Button, TextField, List, ListItem, ListItemText } from "@mui/material"
import axios from "axios"

const Comment = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [comments, setComments] = useState([]) // State to store comments

    // Fetch default comments from the backend
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/blogs/${id}`)
                setComments(response.data.comments || []) // Set default comments from the backend
            } catch (error) {
                console.error("Error fetching comments:", error)
            }
        }
        fetchComments()
    }, [id])

    // Handle adding a new comment
    const handleCommentOnBlog = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''

        try {
            // Dispatch the action to add the comment to the backend
            await dispatch(handleComment({ id, comment }))

            // Add the new comment directly to the frontend state
            setComments((prevComments) => [...prevComments, comment])
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    return (
        <div>
            <h2>Comments</h2>

            {/* Form to add a new comment */}
            <form onSubmit={handleCommentOnBlog}>
                <TextField label="comment" name="comment" />
                <Button variant="contained" color="primary" type="submit">
                    Add comment
                </Button>
            </form>

            {/* Display the list of comments */}
            <List>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={comment} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Comment