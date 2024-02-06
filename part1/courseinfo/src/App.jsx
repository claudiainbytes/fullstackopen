const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].part} exercise={props.parts[0].exercise}/>
      <Part part={props.parts[1].part} exercise={props.parts[1].exercise}/>
      <Part part={props.parts[2].part} exercise={props.parts[2].exercise}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </>
  )
}

const App = () => {
  const exercises = [10, 7, 14];
  const parts = [{ part: "Fundamentals of React", exercise: 10 }, 
                    { part: "Using props to pass data", exercise: 7 }, 
                    { part: "State of a component", exercise: 14 }];
  return (
    <div>
      <Header course="Half Stack application development"/>
      <Content parts={parts}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
