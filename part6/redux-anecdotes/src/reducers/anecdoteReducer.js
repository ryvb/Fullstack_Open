/* eslint-disable no-case-declarations */
import { createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      const newState = state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
      return newState.sort((a, b) => b.votes - a.votes)    
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async dispatch => {
    const newVotes = votedAnecdote.votes + 1
    const changedAnecdote = {
      content: votedAnecdote.content,
      id: votedAnecdote.id,
      votes: newVotes
    }
    const updatedAnecdote = await anecdoteService.updateVote(changedAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

/*

*/