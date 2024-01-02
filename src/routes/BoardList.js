import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const [loading, setLoading] = useState(true);
  const getBoardList = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board`)
    const data = await resp.json();
    setLoading(false);
    setBoardList(data);
  }

  const moveToWrite = () => {
    navigate('/write');
  };

  useEffect(() => {
    getBoardList(); 
  }, []);

  return (
    <div>
      {loading ? (
            <h2>loading...</h2>
      ) : (
      <ul>
        {boardList.map((board) => (
          <li key={board.bid}>
             <Link to={`/board/${board.bid}`}>{board.title}</Link>
          </li>
        ))}
      </ul>
      )}
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;


