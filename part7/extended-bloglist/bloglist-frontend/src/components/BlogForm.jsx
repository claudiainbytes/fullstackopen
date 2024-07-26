import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './../context/BloglistContext';
import blogService from './../services/blogs';

const BlogForm = ({ blogFormRef }) => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const blogs = queryClient.getQueryData(['blogs']);

  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
    onError: (error, variables, context) => {
      notificationDispatch({ type: 'REJECTED' });
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' });
      }, 5000);
    },
  });

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
      createBlogMutation.mutate(newBlog);
      notificationDispatch({
        type: 'BLOG_MESSAGE',
        payload: {
          message: `A new blog  ${newBlog.title} by ${newBlog.author} added`,
          classname: 'success',
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' });
      }, 1000);
    }
  };

  return (
    <form className="p-0" onSubmit={handleAddBlog}>
      <div className="row py-1">
        <label htmlFor="title">Title &nbsp;</label>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={handleBlogTitle}
          />
        </div>
      </div>
      <div className="row py-1">
        <label htmlFor="author">Author &nbsp;</label>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={handleBlogAuthor}
          />
        </div>
      </div>
      <div className="row py-1">
        <label htmlFor="url">URL &nbsp;</label>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={handleBlogURL}
          />
        </div>
      </div>
      <div className="py-2">
        <button
          className="btn btn-primary"
          type="submit"
          id="create-blog-button"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
