import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
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