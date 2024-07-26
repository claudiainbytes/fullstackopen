import { useState } from 'react';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  const comments = blog['comments'];

  return (
    <>
      <CommentForm blog={blog} />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, k) => (
            <tr className="table-default" key={k}>
              <td>{comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Comments;
