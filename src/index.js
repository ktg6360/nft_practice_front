import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './styles/reset.css';
import './styles/common.css';
import rootReducer from './reducers';

const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
