import Blog from './Blog'
import BlogLikeButton from './BlogLikeButton'
import React from 'react'

const BlogList = ({ blogs, setMessage, setBlogs }) => {

    const sortBlogs = () => { blogs.sort((blogA, blogB) => blogB.likes - blogA.likes ) }

    sortBlogs()

    return(
        <div>
          <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}>
                  <div>
                    <span>{blog.url}</span><br/>
                    <BlogLikeButton blog={blog} setMessage={setMessage} sortBlogs={sortBlogs}/><br/>
                    <span>{blog.author}</span><br/>
                  </div>
                </Blog>
            )} 
        </div>
    )
}

export default BlogList