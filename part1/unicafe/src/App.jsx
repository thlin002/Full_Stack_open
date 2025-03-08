import { useState } from 'react'

const App = () => {
  // save clicks of each buttons to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (all === 0) ? 'N/A' :((good * 1 + neutral * 0 + bad * (-1)) / all).toString();
  const positivePct = (all === 0) ? 'N/A' : (good / all * 100).toString() + ' %';

  const clickHandler = (feedback, setFeedback) => () => {
    setFeedback(feedback+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={clickHandler(good, setGood)}>
        good
      </button>
      <button onClick={clickHandler(neutral, setNeutral)}>
        neutral
      </button>
      <button onClick={clickHandler(bad, setBad)}>
        bad
      </button>

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positivePct}</div>
    </div>
  )
}

export default App
