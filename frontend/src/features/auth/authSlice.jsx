import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

// Only user is stored in localStorage, not tokens
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: null,
  refreshToken: null,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Only set user if backend returns user and no error
        if (action.payload && action.payload.user && !action.payload.error && !action.payload.errors) {
          state.user = action.payload.user;
          localStorage.setItem('user', JSON.stringify(state.user));
          state.error = null;
        } else {
          state.user = null;
          localStorage.removeItem('user');
          state.error = action.payload?.error || (action.payload?.errors && action.payload.errors[0]) || "Login failed";
        }
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        // Only set user if backend returns user and no error
        if (action.payload && action.payload.user && !action.payload.error && !action.payload.errors) {
          state.user = action.payload.user;
          localStorage.setItem('user', JSON.stringify(state.user));
          state.error = null;
        } else {
          state.user = null;
          localStorage.removeItem('user');
          state.error = action.payload?.error || (action.payload?.errors && action.payload.errors[0]) || "Signup failed";
        }
        state.loading = false;
      })
      .addCase(login.rejected, signup.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem('user');
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        // If backend returns user, update user in state/localStorage
        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        localStorage.removeItem('user');
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
