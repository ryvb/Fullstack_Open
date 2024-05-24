/* eslint-disable no-case-declarations */
import { createSlice} from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const newVotes = anecdoteToChange.votes + 1
      const changedAnecdote = {
        content: anecdoteToChange.content,
        id: id,
        votes: newVotes
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      return newState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*

*/