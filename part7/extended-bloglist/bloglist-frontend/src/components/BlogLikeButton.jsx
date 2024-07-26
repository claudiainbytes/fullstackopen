import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../context/BloglistContext';
import blogService from '../services/blogs';

const BlogLikeButton = (props) => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const { blog } = props;

  const [likes, setLikes] = useState(blog.likes);

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const handleAddLike = (event) => {
    event.stopPropagation();
    const blogObject = {
      ...blog,
      likes: likes + 1,
    };
    setLikes(blogObject.likes);
    updateBlogMutation.mutate(blogObject);
    notificationDispatch({
      type: 'BLOG_MESSAGE',
      payload: {
        message: `"${blogObject.title}" got a like`,
        classname: 'success',
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: 'EMPTY' });
    }, 600);
  };

  return (
    <>
      <span className="blog-likes">Likes: {likes}</span>
      <button className="btn btn-primary btn-sm mx-2" onClick={handleAddLike}>
        Like
      </button>
    </>
  );
};

export default BlogLikeButton;
