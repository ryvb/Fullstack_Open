import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const allBlogs = blogs.concat(returnedBlog)
        const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
        dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added`))
      })
      .catch(error => {
        dispatch(setNotification('Failed to add blog'))
      })
  }

  const updateLikes = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        const updatedBlogs = (blogs.map(blog => blog.id !== returnedBlog.id ? blog : { ...blog, likes: returnedBlog.likes }))
        const sortedUpdatedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedUpdatedBlogs)
      })
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm
          login={handleLogin}
        />
      </Togglable>
    )
  }

  const handleLogin = async (userObject) => {
    loginFormRef.current.toggleVisibility()
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))

    } catch (exception) {
      dispatch(setNotification('Wrong username or password'))
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    blogService.setToken(null)
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.del(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  const showBlogs = ( blogs ) => {
    return (
      <div>
        {blogs.map(blog => blog.user.username === user.username ? <Blog key={blog.id} blog={blog} updateLike={updateLikes} deleteBlog={deleteBlog} delButton={true}/> : <Blog key={blog.id} blog={blog} updateLike={updateLikes} deleteBlog={deleteBlog} delButton={false}/> )}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>
      {blogForm()}
      {showBlogs(blogs)}
    </div>
  )
}

export default App

/*

*/