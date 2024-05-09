import { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    //event.preventDefault()
    updateLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    })
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
          <li>{blog.likes} <button onClick={() => addLike()} id='like-button'>like</button></li>
          <li>{blog.user.name}</li>
        </ul>
        <button onClick={() => deleteBlog(blog)}>remove</button>

      </div>
    </div>
  )
}

export default Blog