import { likeBlog, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Comment  from './Comment'

import { Table, Button } from 'react-bootstrap'

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
  
  if (user == null || blog == null) {
    return null
  }

  const delButton = checkDelButton()

  return (
    <div>
      <h3>{blog.title}</h3>
      <Table striped>
        <tbody>
          <tr><td>{blog.url}</td><td></td></tr>
          <tr><td>{blog.likes} likes</td><td><Button onClick={() => addLike()} id='like-button'>like</Button></td></tr>
          <tr><td>added by {blog.user.name}</td><td>{delButton && <Button onClick={() => deleteBlog()}>remove</Button>}</td></tr>
        </tbody>
      </Table>
      <Comment blog={blog}/>
    </div>
  )
}

export default Blog

/*

*/
