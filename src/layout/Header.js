import React from 'react';
import { Link, useNavigate  } from "react-router-dom";

const Header = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();
  
  const handleBoardLinkClick = (event) => {
    event.preventDefault(); // <Link>의 기본 동작을 중단
    navigate('/board', { state: {page: 1, search:""} }); // 상태를 비우면서 /board 경로로 이동
  };

  return (
    <header>
      <Link to="/home">홈</Link>
      &nbsp;&nbsp; | &nbsp;&nbsp;
      <Link to="/board" onClick={handleBoardLinkClick}>게시판</Link>
      &nbsp;&nbsp; | &nbsp;&nbsp;
      {isAuthenticated && <button onClick={logout}>로그아웃</button>}
      <hr/>
    </header>
  );
};

export default Header;