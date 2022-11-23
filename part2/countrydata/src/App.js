import { useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = ({ data }) => {
  const countries = data
  const [filter, setFilter] = useState('')
  const [select, setSelect] = useState([])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} select={select} setSelect={setSelect} countries={countries} />
      <Countries key={1} select={select} />
    </div>
  )
}

export default App