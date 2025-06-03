import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  // If already logged in, redirect to dashboard immediately
  if (token) {
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
  <h2 className="text-2xl font-bold text-center">Login</h2>
  <input
    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
    placeholder="Username"
    value={form.username}
    onChange={e => setForm({ ...form, username: e.target.value })}
  />
  <input
    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
    placeholder="Password"
    type="password"
    value={form.password}
    onChange={e => setForm({ ...form, password: e.target.value })}
  />
  <button
    type="submit"
    disabled={loading}
    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
  >
    {loading ? "Loading..." : "Login"}
  </button>
  {error && <p className="text-red-500 text-sm">{error}</p>}
</form>
  );
};

export default LoginPage;
