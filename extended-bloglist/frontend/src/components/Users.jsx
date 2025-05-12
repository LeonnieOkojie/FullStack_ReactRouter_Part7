import React from 'react'
import { useParams, useMatch, Link } from 'react-router-dom'
import { Container, Paper, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

// Component to display a single user's details and their blogs
export const User = ({ users }) => {
  // Get the matching route and the user ID from the URL
  const match = useMatch('/users/:id')
  const id = useParams().id
  const user = match ? users.find((user) => user.id === id) : null

  if (!user) {
    return <p>Loading user data...</p>
  }

  return (
    <Container>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {/* Table showing all blogs added by the user */}
      <TableContainer component={Paper}>
        <TableBody>
          {user.blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                {/* Link to each blog's detailed page */}
                <Link to={`/blogs/${blog.id}`} style={blogStyle}>
                  {blog.title}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Container>
  )
}

const Users = ({ users }) => {
  // Show loading message if user data is not yet available
  if (!users || users.length === 0) {
    return <p>Loading user data...</p>
  }

  return (
    <Container>
    
      {/* Table listing all users and how many blogs each created */}
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {/* Link to individual user's detail page */}
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                {/* Show number of blogs the user has created */}
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users