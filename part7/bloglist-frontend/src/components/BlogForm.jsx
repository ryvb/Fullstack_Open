import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

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
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={event => setBlogTitle(event.target.value)}
            id='title-input'
            data-testid='title-input'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={event => setBlogAuthor(event.target.value)}
            id='author-input'
            data-testid='author-input'
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={event => setBlogUrl(event.target.value)}
            id='url-input'
            data-testid='url-input'
          />
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm