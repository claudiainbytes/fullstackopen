import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

import { PartProp } from './types';

const App = () => {

  const courseName: string = "Half Stack application development";
  
  const courseParts: PartProp[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  
  const totalExercises: number = courseParts.reduce((sum: number, part: { name: string; exerciseCount: number }) => sum + part.exerciseCount, 0);
 
  return (
      <div>
        <Header name={courseName} />
        <Content parts={courseParts} />
        <Total total={totalExercises} />
      </div>
  )
 
}

export default App
