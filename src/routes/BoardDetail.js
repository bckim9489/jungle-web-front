/* BoardDetail.js */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const BoardDetail = () => {
    const { bid } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    


    useEffect(() => {
        const getBoard = async () => {
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board/${bid}`)
            const data = await resp.json();
            setBoard(data);
            setLoading(false);
            console.log(data);
        };
        getBoard();
    }, [bid]);
    
    return (
        <div>
        {loading ? (
            <h2>loading...</h2>
        ) : (
            <Board
            idx={board.bid}
            title={board.title}
            contents={board.contents}
            createdBy={board.uid}
            />
        )}
        </div>
    );
};

export default BoardDetail;