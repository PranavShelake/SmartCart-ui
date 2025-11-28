// C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\store\store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shoppingHistoryReducer from './slices/shoppingHistorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingHistory: shoppingHistoryReducer, 
  },
});

export default store;