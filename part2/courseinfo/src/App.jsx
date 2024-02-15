const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = ({name, exercise}) => {
  return (
    <>
      <p>
        {name} {exercise}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <> 
      { parts.map((part) => <Part key={part.id} name={part.name} exercise={part.exercises}/>) }
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><b>total of {total} exercises</b></p>
}

const Course = ({course}) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <Header course={course}/>
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <>
      { courses.map((course) => <Course key={course.id} course={course} /> ) }
    </>
  )
 
}

export default App
