import { connect } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNewAnecdote(content)
        props.setNotification(`added ${content}`, 5)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { createNewAnecdote, setNotification }
)(AnecdoteForm)