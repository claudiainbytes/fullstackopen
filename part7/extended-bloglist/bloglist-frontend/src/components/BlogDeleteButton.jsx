import blogService from './../services/blogs';
import { useNotificationValue, useNotificationDispatch } from './../context/BloglistContext'

const BlogDeleteButton = (props) => {

  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  const { blog, sortBlogs } = props;

  const handleBlogDelete = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog)
        .then((response) => {
          notificationDispatch({ type: "BLOG_MESSAGE", 
                             payload: { message: response, classname: 'success' } 
                          })
          sortBlogs();
          setTimeout(() => {
            notificationDispatch({ type: "EMPTY" })
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          notificationDispatch({ type: "BLOG_MESSAGE", 
                             payload: {
                              message: error.response.data.error,
                              classname: 'error',
                             } 
                          })
          setTimeout(() => {
            notificationDispatch({ type: "EMPTY" })
          }, 5000);
        });
    }
  };

  return (
    <button className="blog-remove" onClick={handleBlogDelete}>
      Remove
    </button>
  );
};

export default BlogDeleteButton;
