import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { extendLogin, logout } from '../reducers/userReducer'

import blogService from '../services/blogs'

import Togglable from './Togglable'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import Blogs from './Blogs'


const Home = () => {
    const blogFormRef = useRef()
    const loginFormRef = useRef()
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

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
          <button onClick={() => handleLogout()}>logout</button>
          {blogForm()}
          <Blogs />
        </div>
    )
}

export default Home