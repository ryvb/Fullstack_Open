import { useState } from 'react'
import { likeBlog, delBlog, reload } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, delButton }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dispatch = useDispatch()

  const addLike = () => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = () => {
    dispatch(delBlog(blog))
    dispatch(setNotification(`${blog.title} deleted`))
  }

  const [visibleDetails, setVisibleDetails] = useState(false)
  const hideWhenVisible = { display: visibleDetails ? 'none' : '' }
  const showWhenVisible = { display: visibleDetails ? '' : 'none' }

  return (

    <div style={blogStyle}>
      <div className='summarizedBlogInfo' style={hideWhenVisible} data-testid='summarizedBlogInfo'>
        {blog.title} {blog.author}
        <button onClick={() => setVisibleDetails(true)}>view</button>
      </div>
      <div className='detailedBlogInfo' style={showWhenVisible}>
        <button onClick={() => setVisibleDetails(false)}>hide</button>
        <ul>
          <li>{blog.title}</li>
          <li>{blog.url}</li>
          <li data-testid='likes'>{blog.likes} <button onClick={() => addLike()} id='like-button'>like</button></li>
          <li>{blog.user.name}</li>
        </ul>
        <div>
          {delButton && <button onClick={() => deleteBlog()}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog

/*
*/
