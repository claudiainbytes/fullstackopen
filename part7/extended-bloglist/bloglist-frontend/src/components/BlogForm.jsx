import { useState } from 'react';
import {
  useNotificationValue,
  useNotificationDispatch,
} from './../context/BloglistContext';
import blogService from './../services/blogs';

const BlogForm = ({ blogs, setBlogs, sortBlogs, blogFormRef }) => {
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatch();

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  });
  const { title, author, url } = newBlog;

  const handleBlogTitle = ({ target }) =>
    setNewBlog({ ...newBlog, title: target.value });

  const handleBlogAuthor = ({ target }) =>
    setNewBlog({ ...newBlog, author: target.value });

  const handleBlogURL = ({ target }) =>
    setNewBlog({ ...newBlog, url: target.value });

  const isBlogExist = (newBlog) =>
    blogs.find(
      (blog) => blog.name === newBlog.name && blog.author === newBlog.author
    )
      ? true
      : false;

  const handleAddBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    if (isBlogExist(newBlog)) {
      notificationDispatch({
        type: 'BLOG_MESSAGE',
        payload: {
          message: `The blog to add  ${newBlog.title} by ${newBlog.author} exists`,
          classname: 'error',
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' });
      }, 5000);
      setNewBlog({ title: '', author: '', url: '', likes: 0 });
    } else {
      const blogObject = newBlog;
      blogService
        .create(blogObject)
        .then((returnedBlog) => {
          notificationDispatch({
            type: 'BLOG_MESSAGE',
            payload: {
              message: `A new blog  ${returnedBlog.title} by ${returnedBlog.author} added`,
              classname: 'success',
            },
          });
          setTimeout(() => {
            notificationDispatch({ type: 'EMPTY' });
          }, 5000);
          setBlogs(blogs.concat(returnedBlog));
          setNewBlog({ title: '', author: '', url: '', likes: 0 });
          sortBlogs();
        })
        .catch((error) => {
          console.log('error', error);
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
    }
  };

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        <label htmlFor="title">Title &nbsp;</label>
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={handleBlogTitle}
        />
      </div>
      <div>
        <label htmlFor="author">Author &nbsp;</label>
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={handleBlogAuthor}
        />
      </div>
      <div>
        <label htmlFor="url">URL &nbsp;</label>
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={handleBlogURL}
        />
      </div>
      <button type="submit" id="create-blog-button">
        Create
      </button>
    </form>
  );
};

export default BlogForm;
