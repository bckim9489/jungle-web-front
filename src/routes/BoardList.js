import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paging from '../components/Paging';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  //pagination--------------
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
  });

  const handlePageChange = (page) => {
    setPage(page);
    getBoardList(page-1);
  };
  /* ------------------------ */
  const [loading, setLoading] = useState(true);
  const getBoardList = async (pageNumber) => {
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          page: pageNumber,
          size: 10
      })
    });
    const data = await resp.json();
    setLoading(false);
    setBoardList(data.content);
    setPageInfo({
      totalPages : data.totalPages, 
      totalElements : data.totalElements
    });
  }
  
  const moveToWrite = () => {
    navigate('/write');
  };
  useEffect(() => {
    getBoardList(0); 
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
          totalItemsCount={pageInfo.totalElements}
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


