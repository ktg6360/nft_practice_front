import React from 'react';
import './WalletPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function WalletPage() {
  const currentUser = useSelector(state => state.currentUser);
  const user = currentUser.user;

  const onClickCreateWallet = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/createWallet`, {id: user})
    .then(res => {
      alert(res.data.msg);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='wallet-page'>
      <div className='wallet-container'>
        <p>{user}님 환영합니다!!!</p>
        <p>지갑을 생성하시겠습니까?</p>
        <p className='create-button' onClick={onClickCreateWallet}>지갑 생성하기</p>
      </div>
    </div>
  );
}
