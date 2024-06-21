import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'

import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  
  return (
      <div>
        {blogs.map(blog => blog.user.username === user.username ? <Blog key={blog.id} blog={blog} delButton={true}/> : <Blog key={blog.id} blog={blog} delButton={false}/> )}
      </div>
  )
}

export default Blogs