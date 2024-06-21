import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { extendLogin, logout } from './reducers/userReducer'
import Blogs from './components/Blogs'

const App = () => {
  const blogFormRef = useRef()
  const loginFormRef = useRef()
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(extendLogin(user))
    }
  }, [dispatch])

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm />
      </Togglable>
    )
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    blogService.setToken(null)
    dispatch(logout())
  }

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <button onClick={() => handleLogout()}>logout</button>
      {blogForm()}
      <Blogs />
    </div>
  )
}

export default App

/*




  
  const handleLogin = async (userObject) => {
    loginFormRef.current.toggleVisibility()
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(login(user))
      dispatch(setNotification(`${userObject.username} logged in`))

    } catch (exception) {
      dispatch(setNotification('Wrong username or password'))
    }
  }
*/