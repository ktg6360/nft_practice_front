import React from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import Three from '../Three/Three';
import { Canvas } from '@react-three/fiber';

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
      <Canvas>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Three />
      </Canvas>
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
