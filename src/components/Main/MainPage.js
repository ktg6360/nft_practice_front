import React from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  const onClickLinkToSignUp = () => {
    navigate('/signup');
  };

  const onClickLinkToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className='main-page'>
      <div className='main-page-btn-wrapper'>
        <div className='main-page-btn' onClick={onClickLinkToSignUp}>
          <p>회원 가입</p>
        </div>
        <div className='main-page-btn' onClick={onClickLinkToLogIn}>
          <p>로그인</p>
        </div>
      </div>
    </div>
  );
}
