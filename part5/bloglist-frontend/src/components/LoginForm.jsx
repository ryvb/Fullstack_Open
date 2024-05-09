import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ( {
  login,
} ) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    login({
      username: username,
      password: password
    })

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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm

/*

*/