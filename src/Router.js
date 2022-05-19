import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import Wallet from './pages/Wallet/Wallet';
import Mint from './pages/Mint/Mint';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/mint' element={<Mint />} />
      </Routes>
    </BrowserRouter>
  );
}
