import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './../context/BloglistContext';
import blogService from './../services/blogs';

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error, variables, context) => {
      notificationDispatch({ type: 'REJECTED' });
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' });
      }, 5000);
    },
  });

  const [comment, setComment] = useState('');

  const handleComment = ({ target }) => setComment(target.value);

  const handleAddComment = (event) => {
    event.preventDefault();

    const blogObject = {
      ...blog,
      comments: blog.comments.concat([comment]),
    };

    updateBlogMutation.mutate(blogObject);
    notificationDispatch({
      type: 'BLOG_MESSAGE',
      payload: {
        message: 'This blog has a new comment',
        classname: 'success',
      },
    });
    setTimeout(() => {
      setComment('');
      notificationDispatch({ type: 'EMPTY' });
    }, 5000);
  };

  return (
    <form onSubmit={handleAddComment}>
      <div>
        <input
          type="text"
          value={comment}
          name="comment"
          id="comment"
          onChange={handleComment}
        />
      </div>
      <button type="submit" id="create-comment-button">
        Create
      </button>
    </form>
  );
};

export default CommentForm;
