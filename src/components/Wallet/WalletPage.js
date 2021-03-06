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
        alert(`?????? ????????? ${res.data.balance}KLAY ??? ??????????????????.`);
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
          <p>{userId} ??? ???????????????!!!</p>
          <p>????????? ?????????????????????????</p>
          <p className='create-button' onClick={onClickCreateWallet}>?????? ????????????</p>
        </div>
      }
      {isWalletCreated &&
        <div className='wallet-container'>
          <p>{userId} ?????? ?????? ????????? ????????? ????????????.</p>
          <div className='wallet-info'>
            <p>??????: {walletInfo.address}</p>
            <p>????????????: {walletInfo.chainId === 1001 ? 'Baobab' : 'Main'}</p>
            <p>????????????: {new Date(walletInfo.createdAt * 1000).toISOString().slice(0, 10)}</p>
            <div className='wallet-options'>
              <p onClick={onClickCheckBalance}>??? KLAY ????????????</p>
              <p onClick={onClickModalOpen}>KLAY ????????????</p>
              <p onClick={onClickNavToBzznbydBird}>???????????? NFT ????????????</p>
              <p onClick={onClickNavToMintPage}>????????? NFT</p>
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
          <input name='toAddress' type='text' placeholder='KLAY??? ?????? ??????' onChange={onChangeHandler} />
          <input name='amount' type='text' placeholder='?????? KLAY ???' onChange={onChangeHandler} />
          <button className='send-button' onClick={onClickSendKlay}>????????????</button>
        </div>
      </Modal>
    </div>
  );
}
