import { useSelector, useDispatch } from 'react-redux'

import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  
  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id}><Link to={`/blogs/${blog.id}`} state={blog.id}><div style={blogStyle}>{blog.title}</div></Link></div>
      )}
    </div>
  )
}

export default Blogs

/*

*/