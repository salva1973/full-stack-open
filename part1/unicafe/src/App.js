import { useState } from 'react'

const Section = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <thead>
        <tr>
          <td>{text}</td>
          <td>
            {value} {text === 'positive' ? '%' : null}
          </td>
        </tr>
      </thead>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const GOOD_WEIGHT = 1
  const NEUTRAL_WEIGHT = 0
  const BAD_WEIGHT = -1
  const all = good + neutral + bad
  const average =
    (GOOD_WEIGHT * good + NEUTRAL_WEIGHT * neutral + BAD_WEIGHT * bad) / all
  const positive = (good / all) * 100
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <table>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Section title='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Section title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
