// src/features/auth/authAPI.js
const baseUrl = 'http://localhost:3000/api/auth';

// authAPI.js
const login = async (credentials) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await res.json();
  
  // If backend doesn't return user data, create it from credentials
  if (!data.user && data.accessToken) {
    return {
      ...data,
      user: { username: credentials.username }
    };
  }
  
  return data;
};

const signup = async (credentials) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

const logout = async () => {
  const res = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
  });
  return await res.json();
};

const refreshToken = async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refreshToken = state.auth.refreshToken;

  const res = await fetch(`${baseUrl}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('Token refresh failed');
  return await res.json();
};

export default { login, signup, logout, refreshToken };
