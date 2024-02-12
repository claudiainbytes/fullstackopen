import { useState } from 'react'

// Button component defined in a simplified way
const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

// Statistics component 
const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if(all == 0 ) {
    return(
      <>
        No feedback given
      </>
     )
  }
  return(
      <p>
        good {good.collected} <br/>
        neutral {neutral.collected} <br/>
        bad {bad.collected} <br/>
        all {all} <br/>
        average {average} <br/>
        positive {positive} % 
      </p>
  )
}

const App = () => {
  
  // save clicks of each button to its own state, each feedback has two properties, number of collected and score

  const [good, setGood] = useState({ collected: 0, score: 1})
  const [neutral, setNeutral] = useState({ collected: 0, score: 0})
  const [bad, setBad] = useState({ collected: 0, score: -1})

  // statistics states

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  // setters to update each statistic state
  
  // Sum all collected feedbacks
  const setToAll = (arrCollected) => {
    const newAll =  arrCollected.reduce((accumulator, currentVal) => accumulator + currentVal, 0) 
    setAll(newAll)
    return newAll
  }

  // Average of feedbacks according to their score
  const setToAverage = (arrState, newAll) => {
    const scores = arrState.map((obj) => obj.collected * obj.score )
    const newAverage = scores.reduce((accumulator, currentVal) => accumulator + currentVal, 0) / newAll
    setAverage(newAverage)
  }

  // Percentaje of positive feedbacks related to all feedbacks
  const setToPositive = (newGood, newAll) => {
    const newPositive = (newGood.collected * 100) / newAll
    setPositive(newPositive)
  }
  
  // handlers to set the state of each comment usign Spread Operator to update the state

  const handleToGood = () => {
    const newGood = {
      ...good,
      collected: good.collected + 1
    }
    setGood(newGood)
    const newAll = setToAll([ newGood.collected, neutral.collected, bad.collected ])
    setToAverage([newGood, neutral, bad], newAll)
    setToPositive(newGood, newAll)
  }

  const handleToNeutral = () => {
    const newNeutral = {
      ...neutral,
      collected: neutral.collected + 1
    }
    setNeutral(newNeutral)
    const newAll = setToAll([ good.collected, newNeutral.collected, bad.collected ])
    setToAverage([good, newNeutral, bad], newAll)
    setToPositive(good, newAll)
  }

  const handleToBad = () => {
    const newBad = {
      ...bad,
      collected: bad.collected + 1
    }
    setBad(newBad)
    const newAll = setToAll([ good.collected, neutral.collected, newBad.collected ])
    setToAverage([good, neutral, newBad], newAll)
    setToPositive(good, newAll)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={handleToGood}/>&nbsp;
      <Button name="neutral" handleClick={handleToNeutral}/>&nbsp;
      <Button name="bad" handleClick={handleToBad}/>&nbsp;
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App
