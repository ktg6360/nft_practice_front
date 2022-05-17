import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';
import './SignUpPage.css';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onClickSignUp = async () => {
    if (input.id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }

    let returnByIdDuplication = false;

    await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/users`)
      .then(res => {
        const users = res.data;
        if (users.filter(user => user.id === input.id).length > 0) {
          alert('이미 가입되어 있는 아이디입니다.');
          returnByIdDuplication = true;
        }
      })
      .catch(err => console.error(err));

    if (returnByIdDuplication) return;

    if (input.password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (input.password !== input.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}/signUp`, input)
      .then(res => {
        alert(res.data.msg);
        navigate('/wallet');
      })
      .catch(err => console.error(err));

    dispatch(allActions.userActions.loginUser(input.id));
  };

  const onClickLinkToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className='signup-page'>
      <div className='form'>
        <form className='signup-form'>
          <input className='id' name='id' type='text' placeholder='아이디' onChange={onChangeHandler} />
          <input className='name' name='password' type='password' placeholder='비밀번호' onChange={onChangeHandler} />
          <input className='address' name='confirmPassword' type='password' placeholder='비밀번호 확인' onChange={onChangeHandler} />
          <p className='signup-button' onClick={onClickSignUp}>Sign Up</p>
        </form>
        <div className='check-register'>
          <p>이미 가입하셨나요?</p>
          <p className='link-to-login' onClick={onClickLinkToLogIn}>로그인하러 가기</p>
        </div>
      </div>
    </div>
  );
}
