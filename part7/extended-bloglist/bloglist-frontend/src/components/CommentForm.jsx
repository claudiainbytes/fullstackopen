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
    }, 1000);
  };

  return (
    <form className="mb-3" onSubmit={handleAddComment}>
      <div className="row py-1">
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            value={comment}
            name="comment"
            id="comment"
            onChange={handleComment}
          />
        </div>
      </div>
      <button
        className="btn btn-primary my-1"
        type="submit"
        id="create-comment-button"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
