import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
