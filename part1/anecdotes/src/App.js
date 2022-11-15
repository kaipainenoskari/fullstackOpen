import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [max, setMax] = useState("")

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={() => {const copy = [ ...votes ]; copy[selected] += 1; setVotes(copy); setMax(anecdotes[copy.indexOf(Math.max(...copy))])}} text='vote' />
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text='next anectode' />
      <br />
      <h1> Anectode with most votes</h1>
      <br />
      {max}
    </div>
  )
}

export default App