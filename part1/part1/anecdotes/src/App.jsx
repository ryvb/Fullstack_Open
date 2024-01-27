import { useState } from 'react'

const Button = ( {anecdotes, n, selected, vote} ) => {
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={n}>next anecdote</button>
      <button onClick={vote}>vote</button>
    </div>
  )
}

const MostVotes = ( {anecdotes, points} ) => {
  return (
    <div>
      <p>{anecdotes[points.indexOf(Math.max( ...points ))]}</p>
      <p>votes {Math.max( ...points )}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(Number(0)))
  

  const n = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    console.log(points)
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button anecdotes={anecdotes} n={n} selected={selected} vote={vote}/>
      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes} points={points}/>      
    </div>
  )
}

export default App
