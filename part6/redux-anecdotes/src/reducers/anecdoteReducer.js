import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const votedAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = { 
        ...votedAnecdote, 
        votes: votedAnecdote.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote 
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer