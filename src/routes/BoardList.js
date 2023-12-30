import React, {useEffect, useState} from 'react';

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const resp = await fetch("http://localhost:8080/api/all")
    const data = await resp.json();
    console.log(data)
    setBoardList(data);

  }

  useEffect(() => {
    getBoardList(); 
  }, []);

  return (
    <div>
      게시판 목록 출력
    </div>
  );
};

export default BoardList;


