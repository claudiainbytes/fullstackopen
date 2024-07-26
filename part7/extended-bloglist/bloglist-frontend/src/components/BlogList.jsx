import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import BlogLikeButton from './BlogLikeButton';
import BlogDeleteButton from './BlogDeleteButton';
import Togglable from './Togglable';

const BlogList = () => {
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
      <>
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <hr className="hr" />
        <h2 className="pb-2 text-secondary-emphasis">Blogs</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {assortedblogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default BlogList;
