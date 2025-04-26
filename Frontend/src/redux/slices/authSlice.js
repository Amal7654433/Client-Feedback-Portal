// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, signupApi } from "../../services/userService";

export const signup = createAsyncThunk("auth/signup", async (data) => {
  const response = await signupApi(data);
  return response;
});
export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await loginApi(data);
  console.log(response,'response from thunk')
  return response;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await logoutApi();
  return response;
});
// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    authChecked: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.authChecked=true
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.authChecked=true
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
