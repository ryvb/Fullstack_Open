import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }))

    dispatch(setNotification(`${blogTitle} added`))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

  }


  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={blogTitle}
            name="Title"
            onChange={event => setBlogTitle(event.target.value)}
            id='title-input'
            data-testid='title-input'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={event => setBlogAuthor(event.target.value)}
            id='author-input'
            data-testid='author-input'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={blogUrl}
            name="Url"
            onChange={event => setBlogUrl(event.target.value)}
            id='url-input'
            data-testid='url-input'
          />
        </Form.Group>
        <Button type="submit" id='create-button'>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm

/*

  */