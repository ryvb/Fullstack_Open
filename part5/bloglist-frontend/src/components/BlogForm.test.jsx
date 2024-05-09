import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const createButton = container.querySelector('#create-button')

  await user.type(titleInput, 'titel')
  await user.type(authorInput, 'auteur')
  await user.type(urlInput, 'www.url.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('titel')
  expect(createBlog.mock.calls[0][0].author).toBe('auteur')
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com')
})