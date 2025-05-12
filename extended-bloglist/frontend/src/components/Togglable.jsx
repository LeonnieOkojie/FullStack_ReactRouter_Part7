import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

// Creating a Togglable component that can be controlled from outside using ref
const Togglable = forwardRef((props, refs) => {
  // State to track whether the content is visible or not
  const [visible, setVisible] = useState(false)

  // Style to hide the button when content is visible
  const hideWhenVisible = { display: visible ? 'none' : '' }

  // Style to show the content when it's visible
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Function to toggle visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Allows parent components to access toggleVisibility via ref
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  // - A button when content is hidden
  // - The children content and a cancel button when content is visible
  return (
    <Box>
      <Box style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <Box style={showWhenVisible}>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>cancel</Button>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable