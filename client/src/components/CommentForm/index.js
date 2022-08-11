import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ drivewayId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { drivewayId, commentText },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3 className="p-12 display-inline-block">Leave a Review</h3>
      <p
        className={`${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit}>
      <div class="form-group"> 
          <textarea
            name="commentText"
            placeholder="Add your review..."
            value={commentText}
            className="form-control"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button className="btn btn-warning" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
