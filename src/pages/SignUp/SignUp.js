import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

export default function SignUp() {
  const [input, setInput] = useState({
    id: "",
    name: "",
    address: "",
  });

  const onChangeHandler = (e) => {
    setInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onClickSignUp = () => {
    console.log(input);
  }

  return (
    <div className='signup-page'>
      <div className='form'>
        <form className='signup-form'>
          <input className='id' name='id' type='text' placeholder='아이디' onChange={onChangeHandler} />
          <input className='name' name='name' type='text' placeholder='이름' onChange={onChangeHandler} />
          <input className='address' name='address' type='text' placeholder='주소' onChange={onChangeHandler} />
          <p className='signup-button' onClick={onClickSignUp}>Sign Up</p>
        </form>
      </div>
    </div>
  );
}
