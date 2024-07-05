import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const CreateNew = (props) => {

    const content = props.content
    const author =  props.author
    const info = props.info

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(content.value)
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate(`/anecdotes/`)
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
  }

export default CreateNew