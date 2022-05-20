import React, { useState, useEffect } from 'react';
import './MyNFTPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MyNFTPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [mintInfo, setMintInfo] = useState([]);

  const getTokenList = () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        "userId": userId
      }
    };

    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/getTokenList`, config)
      .then(res => {
        setMintInfo(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getTokenList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='nft-page'>
      <div className='nft-container'>
          <p>{userId} 님의 NFT 정보</p>
          {mintInfo.map((info, idx) => {
            return (
              <div className='nft-info' key={idx}>
                <p>소유자: {info.owner}</p>
                <p>토큰ID: {parseInt(info.tokenId, 16)}</p>
                <p>트랜잭션: {info.transactionHash}</p>
                <p>생성일자: {new Date(info.createdAt * 1000).toISOString().slice(0, 10)}</p>
                <div className='nft-options'>
                  <p onClick={() => window.open(`https://baobab.scope.klaytn.com/tx/${info.transactionHash}`)}>Klaytn Scope 에서 확인하기</p>
                  <p onClick={() => window.open(`https://testnets.opensea.io/assets?search[query]=${userId}%20kip-17`)}>Open Sea 에서 확인하기</p>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}
