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
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else {
    const blogs = result.data;

    const assortedblogs = blogs.sort(
      (blogA, blogB) => blogB.likes - blogA.likes
    );

    return (
      <div>
        <h2>Blogs</h2>
        {assortedblogs.map((blog) => {
          return <Blog key={blog.id} blog={blog}/>
        })}
      </div>
    );
  }
};

export default BlogList;
