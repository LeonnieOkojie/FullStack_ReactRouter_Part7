import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom'
import { handleLike, handleRemove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer' 
import { Button, Container } from '@mui/material'
import Comment from './Comment'
// Styling for each blog item in the list
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
// Custom style for the delete button
const deleteStyle = {
  borderRadius: 5,
  backgroundColor: '#4169e1',
  border: 'none',
  padding: '2px 10px',
  cursor: 'pointer'
}
// Blog component to show a single blog post with like/delete options
export const Blog = ({ blogs }) => {
  const navigate = useNavigate() // to redirect user
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id') // Check if URL matches blog ID route
  const id = useParams().id // Get blog ID from the route
  const blog = match ? blogs.find((blog) => blog.id === id) : null

  if (!blog) {
    return null
  }

  const handleLikeClick = () => {
    dispatch(handleLike(blog.id))
    dispatch(showNotification(`${blog.title} has been liked by a user`, 'success', 5)) 
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(handleRemove(blog.id))
      dispatch(showNotification(`${blog.title} has been deleted`, 'success', 5)) // Show success notification
      navigate('/blogs')
    }
  }

  return (
    <div>
      <Container>
        {/* Blog details */}
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={handleLikeClick}>like</button>
        </p>
        <p>added by {blog.author}</p>

        {/* Show delete button only if the blog author is the logged-in user */}
        {blog?.user.name === blog.author && (
          <Button variant="contained" color="primary" onClick={handleDeleteClick} style={deleteStyle}>
            delete
          </Button>
        )}

        {/* Comment section */}
        <Comment />
      </Container>
    </div>
  )
}

// BlogList component to show all blogs in a sorted list
const BlogList = ({ blogs }) => {
  return (
    <Container>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Container key={blog.id} style={blogStyle}>
            {/* Link to individual blog page */}
            <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <h3>{blog.title}</h3>
              </div>
            </Link>
          </Container>
        ))}
    </Container>
  )
}

export default BlogList