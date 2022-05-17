import React, { useState, useEffect } from 'react';
import './WalletPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function WalletPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/users`)
      .then(res => {
        const users = res.data;
        const loginUser = users.filter(user => user.id === userId);
        if (loginUser.length > 0) {
          if (loginUser[0].wallet) {
            setIsWalletCreated(true);
            setWalletInfo(loginUser[0].wallet);
          }
        }
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCreateWallet = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/createWallet`, { id: userId })
      .then(res => {
        alert(res.data.msg);
        setWalletInfo(res.data.wallet);
        setIsWalletCreated(true);
      })
      .catch(err => console.error(err));
  };

  const onClickCheckBalance = () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        "address": walletInfo.address
      }
    };
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/getBalance`, config)
      .then(res => {
        alert(`현재 지갑에 ${res.data.balance}KLAY 가 들어있습니다.`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='wallet-page'>
      {!isWalletCreated &&
        <div className='wallet-container'>
          <p>{userId}님 환영합니다!!!</p>
          <p>지갑을 생성하시겠습니까?</p>
          <p className='create-button' onClick={onClickCreateWallet}>지갑 생성하기</p>
        </div>
      }
      {isWalletCreated &&
        <div className='wallet-container'>
          <p>{userId}님의 지갑 정보는 아래와 같습니다.</p>
          <div className='wallet-info'>
            <p>주소: {walletInfo.address}</p>
            <p>네트워크: {walletInfo.chainId === 1001 ? 'Baobab' : 'Main'}</p>
            <p>생성일자: {new Date(walletInfo.createdAt * 1000).toISOString().slice(0, 10)}</p>
            <p className='check-balance' onClick={onClickCheckBalance}>내 KLAY 확인하기</p>
          </div>
        </div>
      }
    </div>
  );
}
