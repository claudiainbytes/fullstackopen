import { useState, forwardRef } from 'react'

const Blog = forwardRef((props, ref) => {

  const blog = props.blog

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}&nbsp;
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}&nbsp;
        <button onClick={toggleVisibility}>Hide</button>
        {props.children}
      </div> 
    </div>
  )

})

export default Blog