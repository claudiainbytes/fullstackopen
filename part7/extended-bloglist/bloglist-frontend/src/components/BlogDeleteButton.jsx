import blogService from './../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './../context/BloglistContext';

const BlogDeleteButton = (props) => {

  const queryClient =  useQueryClient() 

  const notificationDispatch = useNotificationDispatch();

  const { blog } = props;

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleBlogDelete = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        deleteBlogMutation.mutate(blog)
        notificationDispatch({
          type: 'BLOG_MESSAGE',
          payload: {
            message: `The blog ${blog.title} by ${blog.author} has been removed`,
            classname: 'success',
          },
        })
        setTimeout(() => {
          notificationDispatch({ type: 'EMPTY' });
        }, 1000);
    }
  };

  return (
    <button className="blog-remove" onClick={handleBlogDelete}>
      Remove
    </button>
  );
};

export default BlogDeleteButton;
