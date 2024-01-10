import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpModal from '../components/SignUpModal';

function LoginPage({ authenticate, isAuthenticated }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            userId: id,
            password: password
        };

        fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
            method: "POST",
            mode: "cors",
            cache : "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data =>{
            if(data.token){
                authenticate(); // App 컴포넌트의 인증 상태 변경
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userNm', data.userNm);
                localStorage.setItem('uid', data.uid);
                //alert(data.token);
                navigate('/home'); // 메인 페이지로 이동
            } else {
                alert("로그인 실패");
            }
        })
        .catch(error =>{
            console.error('로그인 에러 : ', error);
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <form 
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleSubmit}
            >
                <label>ID</label>
                <input 
                    type='text' 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                />
                <label>Password</label>
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br />
                <button type='submit'>Login</button>
                <br />
                <button type='button' onClick={openModal}>회원가입</button>
                <SignUpModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </form>
        </div>
    );
}

export default LoginPage;