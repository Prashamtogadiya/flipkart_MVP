import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

const accessTokenFromStorage = localStorage.getItem("accessToken");
const refreshTokenFromStorage = localStorage.getItem("refreshToken");

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: accessTokenFromStorage || null,
  refreshToken: refreshTokenFromStorage || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", authAPI.login);
export const signup = createAsyncThunk("auth/signup", authAPI.signup);
export const logout = createAsyncThunk("auth/logout", authAPI.logout);
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  authAPI.refreshToken
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;      
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // authSlice.js
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        // Either use user from response or create from credentials
        state.user = action.payload.user || {
          username: action.meta.arg.username,
        };

        state.loading = false;
        localStorage.setItem('user', JSON.stringify(state.user));

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user || null;
        state.loading = false;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
