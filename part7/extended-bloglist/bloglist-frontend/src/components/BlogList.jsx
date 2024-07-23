import React from 'react';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogLikeButton from './BlogLikeButton';
import BlogDeleteButton from './BlogDeleteButton';

const BlogList = ({ user }) => {
 
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else {

    const blogs = result.data
    
    const assortedblogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

    return (
      <div>
        <h2>Blogs</h2>
        {assortedblogs.map((blog) => {
          const showBlogUserName = (user) => {
            if (Object.prototype.hasOwnProperty.call(blog, 'user')) {
              if (blog.user.name === user.name) {
                return (
                  <>
                    <span className="blog-author">{blog.user.name}</span>
                    <br />
                    <BlogDeleteButton blog={blog}/>
                    <br />
                  </>
                );
              } else {
                return (
                  <>
                    <span className="blog-author">{blog.user.name}</span>
                    <br />
                  </>
                );
              }
            } else {
              return (
                <>
                  <span className="blog-author">{blog.author}</span>
                  <br />
                </>
              );
            }
          };
          return (
            <Blog key={blog.id} blog={blog}>
              <div>
                <span className="blog-url">{blog.url}</span>
                <br />
                <BlogLikeButton blog={blog} />
                <br />
                {showBlogUserName(user)}
              </div>
            </Blog>
          );
        })}
      </div>
    )
  }
};

export default BlogList;
