import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import BlogLikeButton from './BlogLikeButton';

const BlogDetails = () => {
  const id = useParams().id;

  const result = useQuery({
    queryKey: ['blogs', { id }],
    queryFn: blogService.getBlog,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else {
    if (result.data.status === 400) {
      return <Navigate replace to="/error-404" />;
    } else {
      const blog = result.data;
      return (
        <>
          <h2>{blog.title}</h2>
          <div>
            <div>
              <a href="#">{blog.url}</a>
            </div>
            <div>
              {blog.likes} <BlogLikeButton blog={blog} />
            </div>
            <div>added by {blog.author}</div>
          </div>
        </>
      );
    }
  }
};

export default BlogDetails;
