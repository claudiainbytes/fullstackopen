import { useState } from 'react';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {

  const comments = blog['comments'];

  return (
    <>
      <h3>comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {comments.map((comment, k) => (
          <li key={k}>{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
