import AcnedoteForm from './components/AcnedoteForm'
import AcnedoteList from './components/AcnedoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AcnedoteList/>
      <AcnedoteForm/>
    </div>
  )
}

export default App