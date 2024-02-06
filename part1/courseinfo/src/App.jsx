const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
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
  return (
    <div>
      <Header course="Half Stack application development"/>
      <Content part="Fundamentals of React" exercise="10"/>
      <Content part="Using props to pass data" exercise="7"/>
      <Content part="State of a component" exercise="14"/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
