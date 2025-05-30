// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, // your auth slice
  },
});

export default store;

