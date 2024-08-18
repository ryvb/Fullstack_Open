import { useQuery } from '@apollo/client'
import { RECC_BOOKS } from '../queries'
import { FAV_GENRE } from '../queries'

const Recommend = (props) => {
    const books = useQuery(RECC_BOOKS, {
        errorPolicy: 'all',
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        }
    })
    const favGenre = useQuery(FAV_GENRE)

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favourite genre <strong>{favGenre.data.me.favoriteGenre}</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.data.reccBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Recommend