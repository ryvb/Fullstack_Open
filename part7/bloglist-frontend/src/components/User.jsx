import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogReducer'

import { ListGroup } from 'react-bootstrap'

const User = () => {
    const blogs = useSelector(state => state.blogs)
    const location = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const filteredBlogs = blogs.filter(blog => blog.user.id === location.state)

    if (blogs.length === 0) {
        return null
    }
    return (
        <div>
            <h2>{filteredBlogs[0].user.name}</h2>
            <h3>added blogs</h3>
            {filteredBlogs.map(blog =>
                <ListGroup key={blog.id}>
                    <ListGroup.Item>{blog.title}</ListGroup.Item>
                </ListGroup>
            )}
        </div>
    )
}

export default User

