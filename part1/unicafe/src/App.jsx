import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;
  const average = (all === 0) ? 'N/A' :((good * 1 + neutral * 0 + bad * (-1)) / all).toString();
  const positivePct = (all === 0) ? 'N/A' : (good / all * 100).toString() + ' %';

  let content = <div>No feedback given</div>
  if (all > 0) {
    content = (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePct} />
        </tbody>
      </table>
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
      <Button text="good" onClick={clickHandler(good, setGood)} />
      <Button text="neutral" onClick={clickHandler(neutral, setNeutral)} />
      <Button text="bad" onClick={clickHandler(bad, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
