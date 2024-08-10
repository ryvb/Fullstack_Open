import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { ALL_GENRES } from '../queries'

const Books = (props) => {
  const { data, refetch } = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.data.allGenres.map((genre) => (
        <button key={genre} onClick={() => refetch({genres: genre})}>{genre}</button>
      ))}
      <button onClick={() => refetch({genres: null})}>all genres</button>

    </div>
  )
}

export default Books
/*

*/