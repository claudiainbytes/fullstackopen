import Part from './Part'

const Content = ({parts}) => <> { parts.map((part) => <Part key={part.id} name={part.name} exercise={part.exercises}/>) } </> 

export default Content