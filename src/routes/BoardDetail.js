/* BoardDetail.js */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../components/Board';

const BoardDetail = () => {
    const { bid } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const backToList = () => {
        navigate('/board');
    };

    const goToUpdate = () => {
        navigate(`/update/${bid}`);
    };


    useEffect(() => {
        const getDetail = async () => {
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board/${bid}`)
            const data = await resp.json();
            setBoard(data);
            setLoading(false);
            // console.log(data);
        };

        getDetail();

    }, [bid]);
    
    return (
        <div>
        {loading ? (
            <h2>loading...</h2>
        ) : (
            <Board
            bid={board.bid}
            title={board.title}
            contents={board.contents}
            createdBy={board.uid}
            />
        )}
      <div>
        <button onClick={goToUpdate}>수정</button>
        <button >삭제</button>
        <button onClick={backToList} >목록</button>
      </div>
        </div>
    );
};

export default BoardDetail;