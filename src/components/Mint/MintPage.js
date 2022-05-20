import React, { useState } from 'react';
import './MintPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MintPage() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [isDeployed, setIsDeployed] = useState(false);
  const [isMintCompleted, setIsMintCompleted] = useState(false);

  const onClickDeployContract = () => {
    if (!isDeployed) {
      axios.post(`${process.env.REACT_APP_BACKEND_HOST}/deployContract`, { userId: userId })
        .then(res => {
          setIsDeployed(true);
          alert(res.data.msg);
        })
        .catch(err => console.error(err));
    }

    if (isDeployed) alert('이미 저장소를 만들었습니다.');
  };

  const onClickMint = () => {
    if (!isDeployed) {
      alert('저장소를 먼저 만들어주세요');
      return;
    }

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/mint`, { userId: userId })
      .then(res => {
        setIsMintCompleted(true);
        if (window.confirm(res.data.msg)) navigate('/mynft');
      })
      .catch(err => console.error(err));
  };

  const onClickGoToMyNft = () => {
    navigate('/mynft');
  };

  return (
    <div className='mint-page'>
      <div className='mint-container'>
        <p>나만의 Bzznbyd Bird NFT 발행하기</p>
        <img className='mint-image' src="/images/2.png" alt="bzznbyd" />
        <div className='mint-info'>
          <div className='mint-options'>
            <p onClick={onClickDeployContract}>NFT 저장소 만들기 (스마트 컨트랙트)</p>
            <p onClick={onClickMint}>Bzznbyd Bird NFT 발행</p>
            {isMintCompleted && <p onClick={onClickGoToMyNft}>내 NFT 보러가기</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
