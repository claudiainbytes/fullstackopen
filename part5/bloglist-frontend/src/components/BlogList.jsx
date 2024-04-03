import Blog from './Blog'
import BlogLikeButton from './BlogLikeButton'
import BlogDeleteButton from './BlogDeleteButton'
import React from 'react'

const BlogList = ({ blogs, setMessage, sortBlogs }) => {

  sortBlogs()

  return(
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => {
        const showBlogUserName = () => {
          if(Object.prototype.hasOwnProperty.call(blog, 'user')){
            return(<>
              <span>{blog.user.name}</span><br/>
              <BlogDeleteButton blog={blog} setMessage={setMessage} sortBlogs={sortBlogs}/><br/>
            </>)
          }
        }
        return(
          <Blog key={blog.id} blog={blog}>
            <div>
              <span>{blog.url}</span><br/>
              <BlogLikeButton blog={blog} setMessage={setMessage} sortBlogs={sortBlogs}/><br/>
              { showBlogUserName() }
            </div>
          </Blog>
        )
      }
      )}
    </div>
  )
}

export default BlogList