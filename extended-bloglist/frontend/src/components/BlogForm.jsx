import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer' 
import { Button, TextField } from '@mui/material'

// BlogForm component allows users to submit a new blog post
const BlogForm = () => {
  const dispatch = useDispatch()

  // Function to handle form submission
  const handleAddBlog = async (event) => {
    event.preventDefault()
    // Get input values from the form
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    // Try to add the blog and show a notification
    try{
      dispatch(addBlogs({ title, author, url }))
      dispatch(showNotification(`Blog "${title}" by ${author} added successfully!`, 'success', 5))
    } catch (error) {
      console.error('Error adding blog:', error)
      dispatch(showNotification('Error adding blog. Please try again.', 'error', 5))
    }
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <TextField label='title' name='title' />
        </div>

        <div>
          <TextField label='author' name='author' />
        </div>

        <div>
          <TextField label='url' name='url' />
        </div>

        <Button variant='contained' color='primary' type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm