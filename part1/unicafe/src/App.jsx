import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;
  const average = (all === 0) ? 'N/A' :((good * 1 + neutral * 0 + bad * (-1)) / all).toString();
  const positivePct = (all === 0) ? 'N/A' : (good / all * 100).toString() + ' %';

  let content = <div>No feedback given</div>
  if (all > 0) {
    content = (
      <>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positivePct}</div>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      {content}
    </>
  )
}

const App = () => {
  // save clicks of each buttons to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
