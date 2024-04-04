import { useState } from 'react'

const Blog = (props) => {

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
      <div className="blog-container-toggle" style={hideWhenVisible}>
        <span className="blog-title">{blog.title}</span>&nbsp;
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div className="blog-container-toggle" style={showWhenVisible}>
        <span className="blog-title">{blog.title}</span>&nbsp;
        <button onClick={toggleVisibility}>Hide</button>
        {props.children}
      </div>
    </div>
  )

}

export default Blog