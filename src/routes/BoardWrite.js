import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const BoardWrite = () => {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: '',
        uid: localStorage.getItem("uid"),
        contents: '',
        userNm: localStorage.getItem("userNm")
    });

    const {title, userNm, contents} = board;

    const onChange = (event) =>{
        const {value, name} = event.target;
        setBoard({
            ...board,
            [name]: value
        });
    };
    let headers = new Headers({
        'Content-Type': 'application/json',
    });
    const accessToken = localStorage.getItem("token");
    if(accessToken && accessToken != null){
        headers.append("Authorization", "Bearer "+accessToken);
    }

    async function postData(url = "", data = {}) {
        const response  = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache : "no-cache",
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(data),
        });
        return response.json();
    }

    const saveBoard = async () => {
        postData(`${process.env.REACT_APP_API_URL}/api/insert`, board).then((data) => {
            alert('저장되었습니다.');
            navigate('/board');
        });
    }

    const backToList = () => {
        navigate('/board');
    };

    return (
        <div>
            <div>
            <span>제목</span>
            <input type="text" name="title" value={title} onChange={onChange} />
            </div>
            <br />
            <div>
            <span>작성자</span>
            <input
                type="text"
                name="userNm"
                value= {userNm}
                onChange={onChange}
                readOnly={true}
            />
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
            <button onClick={saveBoard}>저장</button>
            <button onClick={backToList}>취소</button>
            </div>
        </div>   
    );
};

export default BoardWrite;