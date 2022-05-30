import React, { useState, useEffect } from 'react';
import './WalletPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

export default function WalletPage() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mintInfo, setMintInfo] = useState([]);
  const [input, setInput] = useState({
    toAddress: "",
    amount: "",
  });

  const onChangeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
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
            setIsWalletCreated(true);
            setWalletInfo(loginUser[0].wallet);
          }
        }
      })
      .catch(err => console.error(err));

    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/getTokenList`, config)
      .then(res => {
        setMintInfo(res.data);
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

  const onClickModalOpen = () => {
    setModalIsOpen(true);
  };

  const onClickSendKlay = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/sendKlay`, {
      fromAddress: walletInfo.address,
      toAddress: input.toAddress,
      amount: input.amount
    })
      .then(res => {
        alert(res.data.msg);
        setModalIsOpen(false);
      })
      .catch(err => console.error(err));
  };

  const onClickNavToBzznbydBird = () => {
    navigate('/bzznbydbird');
  };

  const onClickNavToMintPage = () => {
    if (mintInfo.length > 0) {
      navigate('/mynft');
    } else {
      navigate('/mint');
    }
  };

  return (
    <div className='wallet-page'>
      {!isWalletCreated &&
        <div className='wallet-container'>
          <p>{userId} 님 환영합니다!!!</p>
          <p>지갑을 생성하시겠습니까?</p>
          <p className='create-button' onClick={onClickCreateWallet}>지갑 생성하기</p>
        </div>
      }
      {isWalletCreated &&
        <div className='wallet-container'>
          <p>{userId} 님의 지갑 정보는 아래와 같습니다.</p>
          <div className='wallet-info'>
            <p>주소: {walletInfo.address}</p>
            <p>네트워크: {walletInfo.chainId === 1001 ? 'Baobab' : 'Main'}</p>
            <p>생성일자: {new Date(walletInfo.createdAt * 1000).toISOString().slice(0, 10)}</p>
            <div className='wallet-options'>
              <p onClick={onClickCheckBalance}>내 KLAY 확인하기</p>
              <p onClick={onClickModalOpen}>KLAY 전송하기</p>
              <p onClick={onClickNavToBzznbydBird}>버즈앤비 NFT 보러가기</p>
              <p onClick={onClickNavToMintPage}>나만의 NFT</p>
            </div>
          </div>
        </div>
      }
      <Modal
        isOpen={modalIsOpen}
        appElement={document.getElementById('root')}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          },
          content: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '350px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
          }
        }}
      >
        <div className='klay-form'>
          <input name='toAddress' type='text' placeholder='KLAY를 보낼 주소' onChange={onChangeHandler} />
          <input name='amount' type='text' placeholder='보낼 KLAY 양' onChange={onChangeHandler} />
          <button className='send-button' onClick={onClickSendKlay}>전송하기</button>
        </div>
      </Modal>
    </div>
  );
}
