import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';
import DashboardPage from './pages/Dashboardpage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import './index.css';  // <- add this line


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
);

export default App;
