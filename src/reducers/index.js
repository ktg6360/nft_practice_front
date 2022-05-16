import counter from './counterReducer';
import currentUser from './userReducers';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({ counter, currentUser });

export default persistReducer(persistConfig, rootReducer);
