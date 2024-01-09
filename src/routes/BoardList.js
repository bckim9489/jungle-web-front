import React, {useEffect, useState, useCallback} from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import Paging from '../components/Paging';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const BoardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [boardList, setBoardList] = useState([]);
  //pagination--------------
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    search: ""
  });

  const handlePageChange = (page) => {
    setPage(page);
    getBoardList(page-1, pageInfo.search);
  };
  /* ------------------------ */
  const [loading, setLoading] = useState(true);

  const onChange = (event) =>{
    const { value, name } = event.target;
    setPageInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const getBoardList = useCallback(async (pageNumber, search) => {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    const accessToken = localStorage.getItem("token");
    if(accessToken && accessToken != null){
      headers.append("Authorization", "Bearer "+accessToken);
    }
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          page: pageNumber,
          size: 10,
          search: search
      })
    });

    const data = await resp.json();
    setLoading(false);
    setBoardList(data.content);

    setPageInfo(prevState => ({
      ...prevState,
      totalPages: data.totalPages,
      totalElements: data.totalElements
    }));
  }, []);
  
  const handleSearch = () => {
    getBoardList(0, pageInfo.search);
  };

  const moveToWrite = () => {
    navigate('/write');
  };

  const goToDetail = (bid) => {
    navigate(`/board/${bid}`, { state: { search: pageInfo.search, page: page } });
  };

  useEffect(() => {
    if (location.state) {
      setPageInfo(prevState => ({
        ...prevState,
        search: location.state.search
      }));
      setPage(location.state.page);
      getBoardList(location.state.page-1, location.state.search);
    } else {
      getBoardList(0, pageInfo.search);
    }
  }, [getBoardList, location.state]);
  
  return (
    <div>
      {loading ? (
            <h2>loading...</h2>
      ) : (
      <TableContainer component={Paper}>
         <Table size="small">
         <TableHead>
          <TableRow>
            <TableCell align='center'>No</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {boardList.map((board, index) => (
          <TableRow key={board.bid} onClick={() => goToDetail(board.bid)}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{board.title}</TableCell>
            <TableCell align="center">{board.userId}</TableCell>
            <TableCell align="center">{board.firstDt}</TableCell>
          </TableRow>
        ))}
        </TableBody>
        </Table>
      </TableContainer>
      )}
      <div>
        <Paging
          page={page}
          totalItemsCount={pageInfo.totalElements}
          handlePageChange={handlePageChange}
        />
      </div>
      <div>
        <input 
          type="text" 
          name="search" 
          value= {pageInfo.search}
          onChange= {onChange}
        /><button onClick={handleSearch}>검색</button>
      </div>
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;


