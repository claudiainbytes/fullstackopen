const Header = (props) => {
  console.log(props.course.name)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercise}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log(props.parts)
  return (
    <>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  console.log(props.parts)
  let total = 0
  props.parts.forEach((part) => { total += part.exercises })
  console.log("Total: " + total)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }  
  console.log(course)
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
