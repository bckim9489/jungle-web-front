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

    async function deleteData(url = "", data = {}) {
        const response  = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache : "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    const nowTodelete = () =>{
        if(window.confirm('삭제하시겠습니까?')){
            deleteData(`${process.env.REACT_APP_API_URL}/api/board`, board).then((data) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    }

    return (
        <div>
        {loading ? (
            <h2>loading...</h2>
        ) : (
            <Board
            bid={board.bid}
            title={board.title}
            contents={board.contents}
            createdBy={board.userId}
            />
        )}
      <div>
        <button onClick={goToUpdate}>수정</button>
        <button onClick={nowTodelete}>삭제</button>
        <button onClick={backToList} >목록</button>
      </div>
        </div>
    );
};

export default BoardDetail;