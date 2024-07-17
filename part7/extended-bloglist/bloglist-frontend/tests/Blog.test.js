/* eslint-disable no-trailing-spaces */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./../src/components/Blog";
import BlogDeleteButton from "./../src/components/BlogDeleteButton";
import BlogLikeButton from "./../src/components/BlogLikeButton";
import { mockComponent } from "react-dom/test-utils";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const setMessage = () => {};

    const sortBlogs = () => {};

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

    const showBlogUserName = () => {
      if (Object.prototype.hasOwnProperty.call(blog, "user")) {
        return (
          <>
            <span>{blog.user.name}</span>
            <br />
            <BlogDeleteButton
              blog={blog}
              setMessage={setMessage}
              sortBlogs={sortBlogs}
            />
            <br />
          </>
        );
      }
    };

    container = render(
      <Blog key={blog.id} blog={blog}>
        <div>
          <span>{blog.url}</span>
          <br />
          <BlogLikeButton
            blog={blog}
            setMessage={setMessage}
            sortBlogs={sortBlogs}
          />
          <br />
          {showBlogUserName()}
        </div>
      </Blog>,
    ).container;
  });

  test("render title and author, not url or likes", () => {
    const title = container.querySelector(".blog-container-toggle .blog-title");
    expect(title).toHaveTextContent("Agile SCRUM Tips");

    const author = screen.getByText("Matti Luukkainen");
    expect(author).toHaveTextContent("Matti Luukkainen");

    const blogToggle = container.getElementsByClassName(
      "blog-container-toggle",
    );
    expect(blogToggle[0]).not.toHaveStyle("display: none");
  });

  test("render blog url and likes when toggle button is clicked", async () => {
    let blogToggle = container.getElementsByClassName("blog-container-toggle");
    expect(blogToggle[0]).not.toHaveStyle("display: none");

    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    blogToggle = container.getElementsByClassName("blog-container-toggle");
    expect(blogToggle[1]).not.toHaveStyle("display: none");

    const url = screen.getByText(
      "https://www.example.com/effective-project-management-tips",
    );
    expect(url).toHaveTextContent(
      "https://www.example.com/effective-project-management-tips",
    );

    const likes = container.querySelector(".blog-likes");
    expect(likes).toHaveTextContent("1516");
  });
});
