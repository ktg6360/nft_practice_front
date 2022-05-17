import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';
import './LogInPage.css';

export default function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: "",
    password: "",
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

    if (input.password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/users`)
      .then(res => {
        const users = res.data;
        const loginUser = users.filter(user => user.id === input.id);
        if (loginUser.length > 0) {
          if (loginUser[0].password === input.password) {
            alert('로그인 성공!');
            navigate('/wallet');
            dispatch(allActions.userActions.loginUser(input.id));
          } else {
            alert('비밀번호가 일치하지 않습니다.');
          }
        } else {
          alert('가입되어있지 않은 아이디입니다.');
        }
      })
      .catch(err => console.error(err));
  };

  const onClickLinkToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className='login-page'>
      <div className='form'>
        <form className='login-form'>
          <input className='id' name='id' type='text' placeholder='아이디' onChange={onChangeHandler} />
          <input className='name' name='password' type='password' placeholder='비밀번호' onChange={onChangeHandler} />
          <p className='login-button' onClick={onClickSignUp}>Log In</p>
        </form>
        <div className='check-register'>
          <p>아직 가입하지 않으셨나요?</p>
          <p className='link-to-singup' onClick={onClickLinkToSignUp}>회원가입하러 가기</p>
        </div>
      </div>
    </div>
  );
}
