import React, { useState, useEffect } from 'react';
import './MyNFTTransactionPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MyNFTTransactionPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const userIdInLowerCase = userId.toLowerCase();
  const [userInfo, setUserInfo] = useState({
    walletInfo: {},
    tokenId: 0,
    hash: "",
    transactionInfo: {}
  });

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
        <p className='transaction-title'>???????????????! <span>????????? NFT ?????????</span> ??? ??????????????? ?????????????????????.</p>
        <div className='transaction-info'>
          <p>BLOCK #: <span>{userInfo.transactionInfo.blockNumber && parseInt(userInfo.transactionInfo.blockNumber, 16)}</span></p>
          <p>??? ?????? ??????: <span>{userInfo.walletInfo.address}</span></p>
        </div>
        <div className='transaction-links'>
          <p onClick={() => window.open(`https://testnets.opensea.io/collection/bzznbyd-nft-${userIdInLowerCase}`)}>
            ??????????????? ????????????
          </p>
          <p onClick={() => window.open(`https://baobab.scope.klaytn.com/tx/${userInfo.hash}`)}>
            ???????????? ??????????????? ????????????
          </p>
        </div>
      </div>
    </div>
  );
}

