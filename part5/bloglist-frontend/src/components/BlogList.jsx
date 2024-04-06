import Blog from './Blog'
import BlogLikeButton from './BlogLikeButton'
import BlogDeleteButton from './BlogDeleteButton'
import React from 'react'

const BlogList = ({ blogs, setMessage, sortBlogs, user }) => {

  sortBlogs()

  return(
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => {
        const showBlogUserName = (user) => {
          if(Object.prototype.hasOwnProperty.call(blog, 'user')){
            if(blog.user.name === user.name){
              return(<>
                <span className="blog-author">{blog.user.name}</span><br/>
                <BlogDeleteButton blog={blog} setMessage={setMessage} sortBlogs={sortBlogs}/><br/>
              </>)
            } else {
              return(<>
                <span className="blog-author">{blog.user.name}</span><br/>
              </>)
            }
          } else {
            return(<>
              <span className="blog-author">{blog.author}</span><br/>
            </>)
          }
        }
        return(
          <Blog key={blog.id} blog={blog}>
            <div>
              <span className="blog-url">{blog.url}</span><br/>
              <BlogLikeButton blog={blog} setMessage={setMessage} sortBlogs={sortBlogs}/><br/>
              { showBlogUserName(user) }
            </div>
          </Blog>
        )
      }
      )}
    </div>
  )
}

export default BlogList