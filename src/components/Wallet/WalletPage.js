import React, { useState } from 'react';
import './WalletPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function WalletPage() {
  const currentUser = useSelector(state => state.currentUser);
  const user = currentUser.user;
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});

  const onClickCreateWallet = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/createWallet`, { id: user })
      .then(res => {
        alert(res.data.msg);
        console.log(res.data.wallet);
        setWalletInfo(res.data.wallet);
        setIsWalletCreated(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='wallet-page'>
      {!isWalletCreated &&
        <div className='wallet-container'>
          <p>{user}님 환영합니다!!!</p>
          <p>지갑을 생성하시겠습니까?</p>
          <p className='create-button' onClick={onClickCreateWallet}>지갑 생성하기</p>
        </div>
      }
      {isWalletCreated &&
        <div className='wallet-container'>
          <p>{user}님의 지갑이 생성되었습니다!!!</p>
          <p>지갑 정보는 아래와 같습니다.</p>
          <div className='wallet-info'>
            <p>주소: {walletInfo.address}</p>
            <p>네트워크: {walletInfo.chainId === 1001 ? 'Baobab' : 'Main'}</p>
            <p>생성일자: {new Date(walletInfo.createdAt * 1000).toISOString().slice(0,10)}</p>
          </div>
        </div>
      }
    </div>
  );
}
