import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import BlogLikeButton from './BlogLikeButton';
import BlogDeleteButton from './BlogDeleteButton';
import Togglable from './Togglable';

const BlogList = ({ user }) => {

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const blogFormRef = useRef();

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else {
    const blogs = result.data;

    const assortedblogs = blogs.sort(
      (blogA, blogB) => blogB.likes - blogA.likes
    );

    return (
      <div>
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <h2>Blogs</h2>
        {assortedblogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }
};

export default BlogList;
