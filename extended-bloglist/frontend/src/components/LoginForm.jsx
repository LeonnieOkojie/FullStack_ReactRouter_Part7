import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewUser } from '../reducers/loginReducer'
import { Button, TextField } from '@mui/material'

// LoginForm component
const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Get values entered in the form
    const username = event.target.username.value
    const password = event.target.password.value
    // Clear the input fields after getting the values
    event.target.username.value = ''
    event.target.password.value = ''

    try {
      // Send username and password to Redux action to log in or create user
      await dispatch(addNewUser({ username, password }))
    } catch (error) {
      
      console.error('Error creating user:', error)
      alert('Error creating user. Please try again.')
    }
    //dispatch(loggedInUser({ username, password }))
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='username' name='username' />
        </div>
        <div>
          <TextField label='password' name='password' type='password' />
        </div>
        <Button variant='contained' color='primary' type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm