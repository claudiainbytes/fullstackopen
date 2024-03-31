import Blog from './Blog'
const BlogList = ({ blogs }) => {
    return(
        <div>
          <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}>
                <p>
                  <span>{blog.url}</span><br/>
                  <span>Likes: {blog.likes}</span><br/>
                  <span>{blog.author}</span><br/>
                </p>
              </Blog>
            )} 
        </div>
    )
}

export default BlogList