import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [text, setText] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(text); // 상위 컴포넌트로 댓글 데이터 전달
      setText(''); // 입력 필드 초기화
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">댓글 작성</button>
      </form>
    );
  };
  
  export default CommentForm;