import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if ( filter !== "ALL" ) {
            const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            return filteredAnecdotes
        } else {
            return anecdotes
        }
    })

    const vote = (id) => {
        // vote
        dispatch(voteAnecdote(id))
        
        //notification
        const anecdoteVoted = anecdotes.filter(anecdote => anecdote.id === id)
        dispatch(setNotification(`you voted '${anecdoteVoted[0].content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </ul>

    )
}

export default Anecdotes
