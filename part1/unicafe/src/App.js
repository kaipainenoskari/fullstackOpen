import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = p => {
  if (p.text === 'positive') {
    return (
      <tbody>
        <tr>
          <td>{p.text}</td>
          <td>{p.value} %</td>
        </tr>
      </tbody>
    )
  }
  else {
    return (
      <tbody>
        <tr>
          <td>{p.text}</td>
          <td>{p.value}</td>
        </tr>
      </tbody>
    )
  }
}

const Statistics = props => {
  if (props.all === 0) {
    return (<p>No feedback given</p>)
  }
  else {
    return (
      <table>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.all} />
        <StatisticLine text='average' value={(props.good - props.bad) / props.all} />
        <StatisticLine text='positive' value={(props.good * 100) / props.all} />
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => {setGood(good + 1); setAll(all + 1)}} text="good" />
      <Button handleClick={() => {setNeutral(neutral + 1); setAll(all + 1)}} text="neutral" />
      <Button handleClick={() => {setBad(bad + 1); setAll(all + 1)}} text="bad" />
      <br />
      <br />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      <br />
    </div>
  )
}

export default App;
