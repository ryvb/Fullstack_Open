import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { extendLogin, logout } from '../reducers/userReducer'

import blogService from '../services/blogs'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

import { Link } from 'react-router-dom'

import { Navbar, Nav, Button } from 'react-bootstrap'


const Home = () => {
    const padding = {
      padding: 5
    }

    const blogFormRef = useRef()
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
    
    const handleLogout = async (event) => {
        window.localStorage.removeItem(
          'loggedBlogappUser'
        )
        blogService.setToken(null)
        dispatch(logout())
    }


    
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding}to="/users">users</Link>
              </Nav.Link>
              {user
                ? <em>{user.name} logged in</em>
                : <Nav.Link href="#" as="span">
                  <Link style={padding}to="/login">login</Link>
                </Nav.Link>}
              {user
                ? <Button onClick={() => handleLogout()}>logout</Button>
                : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <h2>Blog App</h2>
        {user
          ? blogForm()
          : null}
        <Blogs />
      </div>
    )
}

export default Home

/*

*/