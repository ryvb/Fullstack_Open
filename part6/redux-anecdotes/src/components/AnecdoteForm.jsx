import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        // add the anecdote
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))

        // notification
        dispatch(setNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm