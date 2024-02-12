import { useState } from 'react'

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <button>good</button>&nbsp;
      <button>neutral</button>&nbsp;
      <button>bad</button>&nbsp;
      <h1>statistics</h1>
      <p>good 6 <br/>
         neutral 2 <br/>
         bad 1
      </p>
    </div>
  )
}

export default App
