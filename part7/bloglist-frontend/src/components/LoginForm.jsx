import { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    dispatch(login({
      username: username,
      password: password
    }))

    dispatch(setNotification(`${username} logged in`))

    setUsername('')
    setPassword('')
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>

  )
}

export default LoginForm

/*
LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}
*/