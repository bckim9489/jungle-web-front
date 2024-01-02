import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BoardUpdate = () => {
    const navigate = useNavigate();
    const {bid} = useParams();
    const [board, setBoard] = useState({
        bid: 0,
        title: '',
        uid: '',
        contents: '',
    });

    const { title, uid, contents } = board; //비구조화 할당

    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setBoard({
        ...board,
        [name]: value,
        });
    };




    async function putData(url = "", data = {}) {
        const response  = await fetch(url, {
            method: "PUT",
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

    const updateBoard = async () => {
        putData(`${process.env.REACT_APP_API_URL}/api/board`, board).then((data) => {
            alert('저장되었습니다.');
            navigate('/board/' + bid);
        });
    }

    const backToDetail = () => {
        navigate('/board/' + bid);
    };

    useEffect(() => {
        const getDetail = async () => {
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board/${bid}`)
            const data = await resp.json();
            setBoard(data);
        };

        getDetail();
    }, [bid]);

    return (
        <div>
        <div>
            <span>제목</span>
            <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <br />
        <div>
            <span>작성자</span>
            <input type="text" name="uid" value={uid} readOnly={true} />
        </div>
        <br />
        <div>
            <span>내용</span>
            <textarea
            name="contents"
            cols="30"
            rows="10"
            value={contents}
            onChange={onChange}
            ></textarea>
        </div>
        <br />
        <div>
            <button onClick={updateBoard}>저장</button>
            <button onClick={backToDetail}>취소</button>
        </div>
        </div>
    );
};

export default BoardUpdate;