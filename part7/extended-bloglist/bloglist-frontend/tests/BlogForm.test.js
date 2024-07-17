/* eslint-disable no-trailing-spaces */
import React from "react";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "react-dom/test-utils";

describe("<BlogForm />", () => {
  let container;

  test("checking if all props are right after the event handler was called", async () => {
    const mockHandler = jest.fn();

    const blog = {
      id: "66060de97bc8c3d359721141",
      title: "Agile SCRUM Tips",
      author: "John Davis",
      url: "https://www.example.com/effective-project-management-tips",
      likes: 1516,
      user: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        id: "66044ad827c34285729e51de",
      },
    };

    const BlogForm = ({ createBlog }) => {
      const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: "",
        likes: 0,
      });
      const { title, author, url } = newBlog;
      const handleBlogTitle = ({ target }) =>
        setNewBlog({ ...newBlog, title: target.value });
      const handleBlogAuthor = ({ target }) =>
        setNewBlog({ ...newBlog, author: target.value });
      const handleBlogURL = ({ target }) =>
        setNewBlog({ ...newBlog, url: target.value });
      const handleAddBlog = (event) => {
        event.preventDefault();
        createBlog({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          likes: 0,
        });
      };
      return (
        <form onSubmit={handleAddBlog}>
          <div>
            <label htmlFor="title">Title &nbsp;</label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleBlogTitle}
            />
          </div>
          <div>
            <label htmlFor="author">Author &nbsp;</label>
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleBlogAuthor}
            />
          </div>
          <div>
            <label htmlFor="url">URL &nbsp;</label>
            <input
              type="text"
              value={url}
              name="url"
              onChange={handleBlogURL}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      );
    };

    const createBlog = jest.fn();

    const user = userEvent.setup();

    container = render(<BlogForm createBlog={createBlog} />).container;

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], blog["title"]);
    await user.type(inputs[1], blog["author"]);
    await user.type(inputs[2], blog["url"]);

    const sendButton = screen.getByText("Create");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);

    expect(createBlog.mock.calls[0][0].title).toBe(blog["title"]);
    expect(createBlog.mock.calls[0][0].author).toBe(blog["author"]);
    expect(createBlog.mock.calls[0][0].url).toBe(blog["url"]);
    expect(createBlog.mock.calls[0][0].likes).toBe(0);
  });
});
