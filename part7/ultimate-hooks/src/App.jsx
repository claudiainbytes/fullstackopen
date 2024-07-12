import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
     service.getAll()
      .then(data => setResources(data))
  }, [resources])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const create = async (resource) => {

    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, resource, config)
    return response.data

  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const update = async (id, resource) => {
    const response = await axios.put(`${ baseUrl }/${id}`, resource)
    return response.data
  }

  const service = {
    create,
    getAll,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const contentxupdate = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  const [idPerson, setIdPerson] = useState('')

  const handlePersonId = (event, id) => {
    event.preventDefault()
    setIdPerson(id)
  }

  const handleNoteUpdateSubmit = (event) => {
    event.preventDefault()
    noteService.update(idPerson, { content: contentxupdate.value })
    setIdPerson('')
    contentxupdate.onReset()
  }
  
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      { (idPerson === '') ? 
        <form onSubmit={handleNoteSubmit}>
          <input {...content} />
          <button>create</button>
        </form> :
        <form onSubmit={handleNoteUpdateSubmit}>
        <input {...contentxupdate} />
        <button>update</button>
        </form>
      }
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}><a href="#" onClick={(e)=>handlePersonId(e, n.id)}> {n.name} {n.number}</a></p>)}
    </div>
  )
}

export default App