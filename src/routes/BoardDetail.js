/* BoardDetail.js */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Board from '../components/Board';
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';

const BoardDetail = () => {
    const [comments, setComments] = useState([]);

    const location = useLocation();
    const { search, page } = location.state || {};

    const { bid } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const backToList = () => {
        navigate('/board', {state: { search: search, page: page }});
    };

    const goToUpdate = () => {
        navigate(`/update/${bid}`);
    };

    let headers = new Headers({
        'Content-Type': 'application/json',
    });
    const accessToken = localStorage.getItem("token");
    if(accessToken && accessToken != null){
        headers.append("Authorization", "Bearer "+accessToken);
    }
    const [isShow, setShow] = useState(false);
    useEffect(() => {
        const getDetail = async () => {
            const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/board/${bid}`, {
                method: 'GET',
                headers : headers
            });
            const data = await resp.json();
            setBoard(data);
            setLoading(false);
            if (data.uid == localStorage.getItem("uid")){
                setShow(true);
            } else {
                setShow(false);
            }
        };

        getDetail();
        getComment();

    }, [bid]);

    const getComment = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/comment/${bid}`, {
            method: 'GET',
            headers : headers
        });
        const data = await resp.json();
        console.log(data);
        setComments(data);
    };

    
    
    async function deleteData(url = "", data = {}) {
        const response  = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache : "no-cache",
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(data),
        });
        //return response.json();
    }

    const handleCommentSubmit = (commentText) => {
        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        const accessToken = localStorage.getItem("token");
        if(accessToken && accessToken != null){
            headers.append("Authorization", "Bearer "+accessToken);
        }
    
        async function postCommentData() {
            const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/insert`, {
                method: "POST",
                mode: "cors",
                cache : "no-cache",
                credentials: 'include',
                headers: headers,
                body: JSON.stringify({
                    uid : localStorage.getItem("uid")
                    , cid : bid
                    , contents : commentText
                }),
            });
            return response.json();
        }

       
        postCommentData().then((data) => {
            alert('저장되었습니다.');
            getComment();
        });
       
    };

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
            <div>
            <Board
            bid={board.bid}
            title={board.title}
            contents={board.contents}
            createdBy={board.userId}
            />
            <Comments comments={comments} />
            <CommentForm onSubmit={handleCommentSubmit} />
            </div>
        )}
      <div>
        {isShow && <button onClick={goToUpdate}>수정</button>}
        {isShow && <button onClick={nowTodelete}>삭제</button>}
        <button onClick={backToList} >목록</button>
      </div>
        </div>
    );
};

export default BoardDetail;