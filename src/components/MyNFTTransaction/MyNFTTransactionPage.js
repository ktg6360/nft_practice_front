import React, { useState, useEffect } from 'react';
import './MyNFTTransactionPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MyNFTTransactionPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [userInfo, setUserInfo] = useState({
    walletInfo: {},
    tokenId: 0,
    hash: "",
    transactionInfo: {}
  });
  console.log(userInfo);

  const getUserInfo = () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        "userId": userId
      }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/user`, config)
      .then(res => {
        const loginUser = res.data;
        if (loginUser.length > 0) {
          if (loginUser[0].wallet) {
            const walletInfo = loginUser[0].wallet;
            const hashArr = loginUser[0].transactionHashForMyNFT;
            const tokenId = hashArr[hashArr.length - 1].tokenId;
            const hash = hashArr[hashArr.length - 1].hash;

            const config2 = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              params: {
                "hash": hash
              }
            };

            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/getTransactionByHash`, config2)
              .then(res => {
                setUserInfo({
                  walletInfo: walletInfo,
                  tokenId: tokenId,
                  hash: hash,
                  transactionInfo: res.data.result
                });
              })
              .catch(err => console.error(err));
          }
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='transaction-page'>
      <div className='transaction-container'>
        <p className='transaction-title'>축하합니다! <span>나만의 NFT 만들기</span> 가 성공적으로 완료되었습니다.</p>
        <div className='transaction-info'>
          <p>BLOCK #: <span>{userInfo.transactionInfo.blockNumber && parseInt(userInfo.transactionInfo.blockNumber, 16)}</span></p>
          <p>내 지갑 주소: <span>{userInfo.walletInfo.address}</span></p>
        </div>
        <div className='transaction-links'>
          <p onClick={() => window.open(`https://testnets.opensea.io/collection/bzznbyd-nft-${userId}`)}>
            오픈씨에서 확인하기
          </p>
          <p onClick={() => window.open(`https://baobab.scope.klaytn.com/tx/${userInfo.hash}`)}>
            클레이튼 스코프에서 확인하기
          </p>
        </div>
      </div>
    </div>
  );
}

