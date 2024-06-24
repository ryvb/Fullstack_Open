import { likeBlog, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Blog = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const addLike = () => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = () => {
    dispatch(delBlog(blog))
    dispatch(setNotification(`${blog.title} deleted`))
  }

  const blog = blogs.filter(blog => blog.id === location.state)[0]

  const checkDelButton = () => {
    if (user === null) {
      return false
    }
    else {
      if (blog.user.name === user.name) {
        return true
      } else {
        return false
      }
    }
  }
  
  if (user === null) {
    return null
  }

  const delButton = checkDelButton()

  return (
    <div>
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={() => addLike()} id='like-button'>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>{delButton && <button onClick={() => deleteBlog()}>remove</button>}</div>
    </div>
  )
}

export default Blog

/*
const Blog = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blog = location.state

  const addLike = () => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = () => {
    dispatch(delBlog(blog))
    dispatch(setNotification(`${blog.title} deleted`))
  }

  const checkDelButton = () => {
    if (user === null) {
      return false
    }
    else {
      if (blog.user.name === user.name) {
        return true
      } else {
        return false
      }
    }
  }

  const delButton = checkDelButton()

  return (
    <div>
      {console.log(user)}
      {console.log(blog)}
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={() => addLike()} id='like-button'>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>{delButton && <button onClick={() => deleteBlog()}>remove</button>}</div>
    </div>
  )
}

export default Blog
*/
