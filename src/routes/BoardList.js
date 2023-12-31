import React, {useEffect, useState} from 'react';

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board`)
    const data = await resp.json();
    console.log(data)
    setBoardList(data);

  }

  useEffect(() => {
    getBoardList(); 
  }, []);

  return (
    <div>
      <ul>
        {boardList.map((board) => (
          <li key={board.bid}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;


