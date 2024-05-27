import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Anecdotes = () => {
    const queryClient = useQueryClient()
    const [notification, dispatch] = useContext(NotificationContext)

    const updateAnecdoteMutation = useMutation({ 
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))            
        }
       })

    const handleVote = (anecdote) => {
        const newVotes = anecdote.votes + 1
        updateAnecdoteMutation.mutate({...anecdote, votes: newVotes })
        dispatch({ type: 'SET', payload: `anecdote ${anecdote.content} voted`})
        setTimeout(() => {
          dispatch({ type: 'REMOVE' })
      }, 5000)
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })

    console.log(JSON.parse(JSON.stringify(result)))

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    if ( result.isError ) {
        return <div>anecdote service not available due to problems in server</div>
        
    }
    
    const anecdotes = result.data


    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Anecdotes