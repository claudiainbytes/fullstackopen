import { useState } from 'react'
import blogService from './../services/blogs'

const BlogLikeButton = (props) => {

    const { blog, setMessage, sortBlogs } = props
    
    const [likes, setLikes] = useState(blog.likes)

    const handleAddLike = (event) => {
        event.stopPropagation()

        const blogObject = {
          ...blog,
          likes: likes + 1
        }  
    
        blogService
          .update(blog.id, blogObject)
          .then(returnedBlog => {
            setLikes(returnedBlog.likes)
          })
          .catch(error => {
              console.log(error)
              setMessage({ message: error.response.data.error, classname:'error' })
              setTimeout(() => {
                  setMessage(null)
              }, 5000)
          })
        
        sortBlogs()  
    }

    return(
        <><span>Likes: {likes}</span><button onClick={handleAddLike}>Like</button></>
    )
}

export default BlogLikeButton