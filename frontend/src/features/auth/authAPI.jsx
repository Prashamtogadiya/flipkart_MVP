// src/features/auth/authAPI.js
const baseUrl = 'http://localhost:3000/api/auth';

// authAPI.js
const login = async (credentials) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include', // Send/receive cookies
  });

  const data = await res.json();

  // Only return user if login is successful (status 200)
  if (res.ok && data.user) {
    return data;
  }

  // If backend returns error or validation errors, do NOT return user
  return {
    ...data,
    user: null
  };
};

const signup = async (credentials) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  // If backend returns 409 or any error, do NOT return user
  if (!res.ok) {
    return {
      ...data,
      user: null,
      error: data?.error || data?.message || "Signup failed",
    };
  }

  // After signup, immediately call /login to get tokens and user in cookie/session
  const loginRes = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
  let loginData;
  try {
    loginData = await loginRes.json();
  } catch {
    loginData = {};
  }
  if (loginRes.ok && loginData.user) {
    return loginData;
  }

  // If login fails after signup, fallback to original signup data
  return data;
};

const logout = async () => {
  const res = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return await res.json();
};

const refreshToken = async () => {
  // No need to send refreshToken in body, cookie will be sent automatically
  const res = await fetch(`${baseUrl}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Token refresh failed');
  return await res.json();
};

export default { login, signup, logout, refreshToken };
