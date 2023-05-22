import { useState } from 'react'

const Section = ({ title }) => {
  return <h1>{title}</h1>
}

const Anecdote = ({ text, votes }) => {
  return (
    <>
      {text}
      <br />
      has {votes} votes
      <br />
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleRandomChoice = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const findIndexOfLargestNumber = arr =>
    arr.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    )

  const indexOfAnecdoteWithMostVotes = findIndexOfLargestNumber(points)

  return (
    <>
      <Section title='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleRandomChoice} text='next anecdote' />
      <Section title='Anecdote with most votes' />
      {points[indexOfAnecdoteWithMostVotes] > 0 ? (
        <Anecdote
          text={anecdotes[indexOfAnecdoteWithMostVotes]}
          votes={points[indexOfAnecdoteWithMostVotes]}
        />
      ) : null}
    </>
  )
}

export default App
