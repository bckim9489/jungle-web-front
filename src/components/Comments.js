import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>댓글</h3>
      <hr/>
      <ul>
        {comments.map(comment => (
          <li key={comment.cid}>
            <span>{comment.contents}</span><small> || 작성자: {comment.userNm}</small> <small> ||  {comment.firstDt}</small>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
};

export default Comments;