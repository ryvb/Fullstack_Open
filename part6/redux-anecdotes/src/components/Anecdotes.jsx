import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

    const vote = (votedAnecdote) => {
        // vote
        dispatch(voteAnecdote(votedAnecdote))
        
        //notification
        const anecdoteVoted = anecdotes.filter(anecdote => anecdote.id === votedAnecdote.id)
        dispatch(setNotification(`you voted '${anecdoteVoted[0].content}'`, 5))
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
                    <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </ul>

    )
}

export default Anecdotes
