// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // adjust the path if needed

const store = configureStore({
  reducer: {
    auth: authReducer, // your auth slice
  },
});

export default store;

