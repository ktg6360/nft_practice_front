import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import Wallet from './pages/Wallet/Wallet';
import Mint from './pages/Mint/Mint';
import BzznbydBrid from './pages/BzznbydBird/BzznbydBrid';
import MyNFT from './pages/MyNFT/MyNFT';
import Transaction from './pages/Transaction/Transaction';
import MyNFTTransaction from './pages/MyNFTTransaction/MyNFTTransaction';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/bzznbydbird' element={<BzznbydBrid />} />
        <Route path='/mint' element={<Mint />} />
        <Route path='/mynft' element={<MyNFT />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/mynft-transaction' element={<MyNFTTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}
