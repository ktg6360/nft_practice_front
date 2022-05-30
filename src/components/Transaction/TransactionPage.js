import React, { useState, useEffect } from 'react';
import './TransactionPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function TransactionPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [walletInfo, setWalletInfo] = useState({});
  console.log(walletInfo);

  const getWalletInfo = () => {
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
            setWalletInfo(loginUser[0].wallet);
          }
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getWalletInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>내 지갑 주소: {walletInfo.address}</p>
    </div>
  );
}
