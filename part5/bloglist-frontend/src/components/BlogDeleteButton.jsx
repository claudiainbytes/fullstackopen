import blogService from './../services/blogs'

const BlogDeleteButton = (props) => {

  const { blog, setMessage, sortBlogs } = props

  const handleBlogDelete = (event) => {

    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog)
        .then(response => {
          setMessage({ message: response, classname:'success' })
          sortBlogs()
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setMessage({ message: error.response.data.error, classname:'error' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

  }

  return(
    <button className="blog-remove" onClick={handleBlogDelete}>Remove</button>
  )
}

export default BlogDeleteButton