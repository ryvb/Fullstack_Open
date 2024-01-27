import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const net = good - bad
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
    
  } else {
    return (
      <div>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={net / all} />
          <StatisticLine text="positive" value={good / all * 100} />
        </table>
      </div>
    )
  }
}

const StatisticLine = ( {text, value} ) => {
  if (text == 'positive') {
    return (
      <tr>
        <td>{text}</td> 
        <td>{value}%</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Button = ({goodClick, neutralClick, badClick}) => {
  return (
    <div>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button goodClick={increaseGood} neutralClick={increaseNeutral} badClick={increaseBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App


//<h1>give feedback</h1>
//<Button goodClick={increaseGood} neutralClick={increaseNeutral} badClick={increaseBad}/>
//<h1>statistics</h1>
//<Statistics good={good} neutral={neutral} bad={bad}/>

