import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

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
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} state={blog.id}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs

