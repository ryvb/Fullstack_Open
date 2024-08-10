import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_AUTHOR } from '../queries'

const Authors = (props) => {
  //const authors = useQuery(ALL_AUTHORS, {pollInterval: 10000})
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn ] = useState('')
  const [ changeAuthor ] = useMutation(CHANGE_AUTHOR)

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const authorNames = authors.data.allAuthors.map((author => author.name))

  const bornSubmit = async (event) => {
    event.preventDefault()
    const intBorn = Number(born)

    changeAuthor({ variables: { name, intBorn }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={bornSubmit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authorNames.map((author, index) => <option key={index} value={author}>{author}</option>)}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange = {({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors

/*

*/
