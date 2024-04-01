import blogService from './../services/blogs'

const BlogLikeButton = (props) => {

    const { blog, setMessage } = props

    const handleAddLike = () => {
       
        const blogObject = {
          ...blog,
          likes: blog.likes + 1
        }  
    
        blogService
          .update(blog.id, blogObject)
          .then(returnedBlog => {
            setMessage({ message: `Liked`, classname:'success' })
            setTimeout(() => {
                setMessage(null)
            }, 1000)
            blog.likes = returnedBlog.likes
          })
          .catch(error => {
              console.log(error)
              setMessage({ message: error.response.data.error, classname:'error' })
              setTimeout(() => {
                  setMessage(null)
              }, 5000)
          })
           
    }

    return(
        <><span>Likes: {blog.likes}</span><button onClick={handleAddLike}>Like</button></>
    )
}

export default BlogLikeButton