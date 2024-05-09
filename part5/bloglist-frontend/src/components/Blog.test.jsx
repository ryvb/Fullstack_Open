import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('>Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Hallo',
      author: 'Fred',
      url: 'www.abc.com',
      likes: 5,
      user: {
        username: 'HF',
        name: 'Fred Jantje',
      }
    }
    container = render(<Blog blog={blog}/>).container
  })

  test('renders summarized blog content', () => {
    const div = container.querySelector('.summarizedBlogInfo')
    //screen.debug(div)
    expect(div).toHaveTextContent('Hallo', 'Fred')
  })

  test('after clicking button detailed information is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.detailedBlogInfo')
    //screen.debug(div)
    expect(div).toHaveTextContent('Hallo', 'www.abc.com', 5, 'Fred Jantje')
  })

  test('addlike received twice as prop after clicking like button twice', async () => {
    const blog = {
      title: 'Hallo',
      author: 'Fred',
      url: 'www.abc.com',
      likes: 5,
      user: {
        username: 'HF',
        name: 'Fred Jantje',
      }
    }
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} updateLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = container.querySelector('#like-button')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})



/*

*/
