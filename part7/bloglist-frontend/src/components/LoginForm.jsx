import { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useNavigate } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    dispatch(login({
      username: username,
      password: password
    }))

    dispatch(setNotification(`${username} logged in`))

    setUsername('')
    setPassword('')

    navigate('/')

  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>

  )
}

export default LoginForm

/*
LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}
*/