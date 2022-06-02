import React, { useState, useEffect } from 'react';
import './MyNFTPage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';

export default function MyNFTPage() {
  const currentUser = useSelector(state => state.currentUser);
  const userId = currentUser.user;
  const [progress, setProgress] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "images/upload_file_default.png",
  });

  const [ipfsHash, setIpfsHash] = useState('');
  console.log('IPFS: ', ipfsHash);
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    image: "",
    date: 0
  });
  console.log('METADATA: ', metaData);

  const [loaded, setLoaded] = useState(false);
  const [step1Loading, setStep1Loading] = useState(false);
  const [step2Loading, setStep2Loading] = useState(false);
  const [step3Loading, setStep3Loading] = useState(false);
  const [step4Loading, setStep4Loading] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }

    fileReader.onload = () => {
      setImage(
        {
          image_file: e.target.files[0],
          preview_URL: fileReader.result
        }
      );
      setLoaded(true);
    };
  };

  const sendImageToServer = async () => {
    if (progress.step1) {
      alert('이미 완료하였습니다.');
      return;
    }

    if (image.image_file) {
      setStep1Loading(true);
      const formData = new FormData();
      formData.append('file', image.image_file);
      await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/upload`, formData, { userId });
      setLoaded(false);
      setProgress({
        step1: true,
        step2: false,
        step3: false,
        step4: false
      });
      setStep1Loading(false);
      alert("서버에 등록이 완료되었습니다!");
    }
    else {
      alert("사진을 등록하세요!");
    }
  };

  const createMetaData = async () => {
    if (!progress.step1) {
      alert('STEP1 을 먼저 완료해주세요.');
      return;
    }
    if (progress.step2) {
      alert('이미 완료하였습니다.');
      return;
    }

    setStep2Loading(true);

    const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/pinata`, {
      userId: userId,
      fileName: image.image_file.name
    });

    console.log(result);

    setStep2Loading(false);

    setProgress({
      step1: true,
      step2: true,
      step3: false,
      step4: false
    });

    setIpfsHash(result.data.result.IpfsHash);
    setMetaData(result.data.metaData);
    alert(result.data.msg);
    setModalIsOpen(true);
  };

  const deployContract = async() => {
    if (!progress.step1) {
      alert('STEP1 을 먼저 완료해주세요.');
      return;
    }
    if (!progress.step2) {
      alert('STEP2 를 먼저 완료해주세요.');
      return;
    }
    if (progress.step3) {
      alert('이미 완료하였습니다.');
      return;
    }

    setStep3Loading(true);
    const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/deployMyContract`, {
      userId: userId
    });

    console.log(result);

    setStep3Loading(false);

    setProgress({
      step1: true,
      step2: true,
      step3: true,
      step4: false
    });

    alert(result.data.msg);
  };

  const mint = async() => {
    if (!progress.step1) {
      alert('STEP1 을 먼저 완료해주세요.');
      return;
    }
    if (!progress.step2) {
      alert('STEP2 를 먼저 완료해주세요.');
      return;
    }
    if (!progress.step3) {
      alert('STEP3 를 먼저 완료해주세요.');
      return;
    }
    if (progress.step4) {
      alert('이미 완료하였습니다.');
      return;
    }

    setStep4Loading(true);
    const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/mintMyNFT`, {
      userId: userId,
      ipfsHash: ipfsHash
    });

    console.log(result);

    setStep4Loading(false);

    setProgress({
      step1: true,
      step2: true,
      step3: true,
      step4: true
    });

    alert(result.data.msg);
  };

  return (
    <div className='nft-page'>
      <div className='nft-container'>
        <p className='nft-page-title'>나만의 NFT 만들기</p>
        <input type="file" accept="image/*" onChange={saveImage} />
        <div className="img-wrapper">
          {loaded === false || loaded === true ? (
            <img alt='bzznbyd' src={image.preview_URL} />
          ) : (
            <div>이미지 불러오는 중...</div>
          )}
        </div>
        <div className='upload-wrapper'>
          <div className='upload'>
            <p>STEP 1. 서버에 이미지 올리기</p>
            {step1Loading
              ? <p className='loading'>로딩 중</p>
              : <p className='upload-btn' onClick={sendImageToServer}>Click</p>
            }
          </div>
          <div className='upload'>
            <p>STEP 2. 메타데이터 만들기</p>
            {step2Loading
              ? <p className='loading'>로딩 중</p>
              : <p className='upload-btn' onClick={createMetaData}>Click</p>
            }
          </div>
          <div className='upload'>
            <p>STEP 3. NFT 저장소 만들기</p>
            {step3Loading
              ? <p className='loading'>로딩 중</p>
              : <p className='upload-btn' onClick={deployContract}>Click</p>
            }
          </div>
          <div className='upload'>
            <p>STEP 4. NFT 발행하기</p>
            {step4Loading
              ? <p className='loading'>로딩 중</p>
              : <p className='upload-btn' onClick={mint}>Click</p>
            }
          </div>
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
            height: '300px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
          }
        }}
      >
        <div className='nft-modal'>
          <p className='nft-modal-title'>만들어진 메타데이터</p>
          <div className='nft-modal-info'>
            <p>name: {metaData.name}</p>
            <p>description: {metaData.description}</p>
            <p>image: {metaData.image}</p>
            <p>date: {metaData.date}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
