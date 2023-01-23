const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const g = {
        ...state,
        good: state.good + 1
      }
      return g
    case 'OK':
      const o = {
        ...state,
        ok: state.ok + 1
      }
      return o
    case 'BAD':
      const b = {
        ...state,
        bad: state.bad + 1
      }
      return b
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer