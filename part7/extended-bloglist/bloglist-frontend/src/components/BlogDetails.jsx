import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import BlogLikeButton from './BlogLikeButton';
import Comments from './Comments';

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
          <h2 className="pb-2 text-secondary-emphasis">{blog.title}</h2>
          <div className="py-3">
            <div>
              <a href="#">{blog.url}</a>
            </div>
            <div>
              {blog.likes} <BlogLikeButton blog={blog} />
            </div>
            <div><strong>added by {blog.author}</strong></div>
          </div>
          <div>
            <Comments blog={blog} />
          </div>
        </>
      );
    }
  }
};

export default BlogDetails;
