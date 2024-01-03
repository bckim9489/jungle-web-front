import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paging from '../components/Paging';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  //pagination--------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  /* ------------------------ */
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
        <Paging
          page={page}
          totalItemsCount={boardList.length}
          handlePageChange={handlePageChange}
        />
      </div>
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;


