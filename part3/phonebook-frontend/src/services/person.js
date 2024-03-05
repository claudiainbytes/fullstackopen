import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteP = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`)
  return request.then(response => `The person which name is ${person.name} has been deleted.` )
}

export default {  getAll, create, update, deleteP }