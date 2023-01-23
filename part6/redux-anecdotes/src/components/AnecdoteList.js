import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`voted for ${anecdote.content}`, 5))
    }
    const anecdotes = useSelector(state => {
        return(
            state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
        )
    })
    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList