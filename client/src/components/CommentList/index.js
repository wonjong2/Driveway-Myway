import React from 'react';

const CommentList = ({ comments = []}) => {

  if (!comments.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <>
      <h3 className="p-6 display-inline-block">
        Customer Reviews:
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-6 pb-6">
              <div className="p-6">
                <h5 className="card-header">
                  <span style={{ fontSize: '0.825rem' }}>
                    Posted on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
