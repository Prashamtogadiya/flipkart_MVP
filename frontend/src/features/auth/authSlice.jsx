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
      // Tokens are not stored in state anymore
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Tokens are handled by cookies, just set user
        state.user = action.payload.user || {
          username: action.meta.arg.username,
        };
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(login.rejected, signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem('user');
      })
      .addCase(refreshAccessToken.fulfilled, () => {
        // No need to update token in state, handled by cookie
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
