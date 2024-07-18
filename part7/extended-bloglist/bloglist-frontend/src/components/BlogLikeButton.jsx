import { useState } from 'react';
import {
  useNotificationValue,
  useNotificationDispatch,
} from './../context/BloglistContext';
import blogService from './../services/blogs';

const BlogLikeButton = (props) => {
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatch();

  const { blog, sortBlogs } = props;

  const [likes, setLikes] = useState(blog.likes);

  const handleAddLike = (event) => {
    event.stopPropagation();

    const blogObject = {
      ...blog,
      likes: likes + 1,
    };

    blogService
      .update(blog.id, blogObject)
      .then((returnedBlog) => {
        setLikes(returnedBlog.likes);
        sortBlogs();
      })
      .catch((error) => {
        notificationDispatch({
          type: 'BLOG_MESSAGE',
          payload: {
            message: error.response.data.error,
            classname: 'error',
          },
        });
        setTimeout(() => {
          notificationDispatch({ type: 'EMPTY' });
        }, 5000);
      });
  };

  return (
    <>
      <span className="blog-likes">Likes: {likes}</span>
      <button className="blog-like-button" onClick={handleAddLike}>
        Like
      </button>
    </>
  );
};

export default BlogLikeButton;
