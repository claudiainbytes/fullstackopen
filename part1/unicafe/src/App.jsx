import { useState } from 'react'

// Button component defined in a simplified way
const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const App = () => {
  
  // save clicks of each button to its own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // handlers to set the state of each comment

  const handleToGood = () => {
    console.log("feedback to good")
    const newGood = good + 1
    setGood(newGood)
  }

  const handleToNeutral = () => {
    console.log("feedback to neutral")
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleToBad = () => {
    console.log("feedback to bad")
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={handleToGood}/>&nbsp;
      <Button name="neutral" handleClick={handleToNeutral}/>&nbsp;
      <Button name="bad" handleClick={handleToBad}/>&nbsp;
      <h1>statistics</h1>
      <p>good {good} <br/>
         neutral {neutral} <br/>
         bad {bad}
      </p>
    </div>
  )
}

export default App
