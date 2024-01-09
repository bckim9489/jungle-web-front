import React, { useState, useEffect ,useRef} from 'react';
import Modal from 'react-modal';

const SignUpModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    userNm: ''
  });
  const userIdInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  let headers = new Headers({
    'Content-Type': 'application/json',
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(`${process.env.REACT_APP_API_URL}/auth/signup`, formData).then((data) => {
        if(data.status){
            console.log(data);
            alert('이미 등록된 아이디입니다.');
            setFormData({ ...formData, userId: '' });
            userIdInputRef.current.focus();
        } else {
            alert('회원 정보가 등록되었습니다.');
            onRequestClose();// 모달 닫기
        }
        
    });
     
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ userId: '', password: '', userNm: '' }); // 모달이 열릴 때마다 초기화
    }
  }, [isOpen]); // isOpen이 변경될 때마다 실행

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px', // 원하는 너비
      height: '500px', // 원하는 높이
      padding: '20px',
      overflow: 'auto' // 내용이 많을 때 스크롤
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="회원 가입"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2 style={{ textAlign: 'center' }}>회원 가입</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            ref={userIdInputRef}
            required
            style={{ width: '100%'}}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%'}}
          />
        </div>
        <div>
          <label htmlFor="userNm">이름</label>
          <input
            type="text"
            id="userNm"
            name="userNm"
            value={formData.userNm}
            onChange={handleChange}
            required
            style={{ width: '100%'}}
          />
        </div>
        <button type="button" onClick={handleSubmit} style={{ padding: '8px 0', marginTop: '10px' }}>가입하기</button>
        <button type='button' onClick={onRequestClose} style={{ padding: '8px 0', marginTop: '10px' }}>취소</button>
      </form>
    </Modal>
  );
};

export default SignUpModal;