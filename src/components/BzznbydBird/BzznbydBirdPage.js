import React, { useState, useEffect } from 'react';
import './BzznbydBirdPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

export default function BzznbydBirdPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const navigate = useNavigate();
  const [tokenList, setTokenList] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getTokenList = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/getTokenList`)
      .then(res => {
        setTokenList(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getTokenList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickModalOpen = tokenId => {
    setSelectedTokenId(tokenId);
    setModalIsOpen(true);
  };

  const onClickTransfer = tokenId => {
    console.log(userId);
    console.log(tokenId);

    if (window.confirm('정말 내 지갑으로 가져오겠습니까?')) {
      axios.post(`${process.env.REACT_APP_BACKEND_HOST}/transfer`, {
        userId: userId,
        tokenId: tokenId
      })
        .then(res => {
          alert(res.data.msg);
          navigate('/transaction');
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className='bb-page'>
      <div className='bb-container'>
        <div className='bb-page-title'>
          <p>Bzznbyd Birds</p>
        </div>
        <div className='link-to-opensea'>
          <p onClick={() => window.open(`https://testnets.opensea.io/collection/bzznbyd-birds-project`)}>오픈씨에서 보기</p>
        </div>
        <div className='bb-image-grid-box'>
          {tokenList.map(token => {
            const tokenId = parseInt(token.tokenId, 16);
            return (
              <div className='bb-image-wrapper' key={tokenId}>
                <img className='bb-image' src={`/images/${tokenId}.png`} alt="bzznbyd" onClick={() => onClickModalOpen(tokenId)} />
                <span className='bb-image-name'>버즈앤비 버드 #{tokenId}</span>
              </div>
            );
          }).reverse()}
        </div>
      </div>
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
            width: '540px',
            height: '660px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
          }
        }}
      >
        <div className='modal'>
          <img className='selected-image' src={`/images/${selectedTokenId}.png`} alt="bzznbyd" />
          <div className='modal-options'>
            <p onClick={() => window.open(`https://testnets.opensea.io/assets/baobab/0xaaa335d7443349a0416925b2efe52026b8a4a71b/${selectedTokenId}`)}>
              오픈씨에서 보기
            </p>
            <p onClick={() => onClickTransfer(selectedTokenId)}>버즈앤비 버드 내 지갑으로 전송하기</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
