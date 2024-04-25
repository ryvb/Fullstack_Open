import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setBlogTitle('')
          setBlogAuthor('')
          setBlogUrl('')
          setMessage(`${blogObject.title} by ${blogObject.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`Failed to add blog`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  }

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => {setBlogAuthor(target.value)}}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => {setBlogUrl(target.value)}}
          />
        </div>
        <button type="submit">create</button>

      </form>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>    
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
        <h2>Log in to application</h2>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  const blogsToShow = blogs.filter(blog => blog.user.username === user.username)

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>

      <h2>Create new</h2>
      <Notification message={message}/>
      {blogForm()}
      
      {blogsToShow.map(blog => <Blog key={blog.id} blog={blog}/>)}
      
    </div>
  )
}

export default App

/*
<LoginForm handleLogin={handleLogin} username={username} password={password}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

  const blogsToShow = () => {
    const filteredBlogs = blogs.filter(blog => blog.user.username === user.username)
    filteredBlogs.map(blog => console.log(blog))
  }
*/