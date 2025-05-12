import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import BlogList, { Blog } from './components/Blog'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './components/Home'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { loggedInUser, loggedOutUser } from './reducers/loginReducer'
import Users, { User } from './components/Users'
import { initialUser } from './reducers/userReducer'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef() // To detect current route
  const location = useLocation() // To detect current route
  const blogs = useSelector(state => state.blogs) // Get blog list from Redux
  const login = useSelector(state => state.login) // Get login state from Redux
  const allUsers = useSelector(state => state.users) // Get all users from Redux
  console.log('Redux users state:', allUsers)
  const user = login.user // Currently logged in user

  // Load all blogs when app loads
  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])
  console.log('render', blogs.length, 'blogs')

  // Check if user is already logged in when app loads
  useEffect(() => {
    dispatch(loggedInUser())
  }, [dispatch])

  // Load all users when app loads
  useEffect(() => {
    dispatch(initialUser())
  }, [dispatch])

  // Handle user logout
  const handleLogout = () => {
    dispatch(loggedOutUser())
  }

  // blog form wrapped in a togglable component
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  // login form wrapped in a togglable component
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    )
  }
  
  const Footer = () => {
    return (
      <div>
        <br />
        <em>Blog app for <a href="https://fullstackopen.com/en/">Full Stack Open 2025</a></em>
      </div>
    )
  }

  return (
    <Container>
      {/* If user is not logged in, show login form */}
      {user === null ? loginForm() :
        <div>
          {/* App navigation bar */}
          <AppBar position="static">
            <Toolbar>
              <Button color='inherit' component={Link} to="/blogs"> blogs </Button>
              <Button color='inherit' component={Link} to="/users"> users </Button>
              <Typography variant='h6' style={{ flexGrow: 1 }}>
                {user.username} logged-in
              </Typography>
              <Button color='inherit' onClick={handleLogout}>logout</Button>
            </Toolbar>
          </AppBar>

          <h1>blog app</h1>
          <Notification />
          {/* Show blog form only on '/blogs' page */}
          {location.pathname === '/blogs' && blogForm()} <br />
          
          <Routes>
            <Route path="/" element={<Home blogs={blogs} />} />
            <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
            <Route path="/create" element={<BlogForm />} />
            <Route path="/users/:id" element={<User users={allUsers} />} />
            <Route
                path="/users"
                element={<Users users={allUsers} user={user} handleLogout={handleLogout} />}
            />
            <Route path="/blogs" element={<BlogList blogs={blogs} />} />
          </Routes>
        </div>
      }
      <Footer />
    </Container>
  )
}

export default App