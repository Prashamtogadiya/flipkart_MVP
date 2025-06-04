import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
// import DashboardLayout from './pages/DashboardPage';
import DashboardPage from "./pages/Dashboardpage";

// import HomePage from './pages/HomePage';
import ProductsPage from "./pages/ProductPage";
import "./index.css";
import HeroSection from "./pages/HeroSection";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Dashboard Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route path="/" index element={<HeroSection />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />


        {/* Add more nested routes here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// // import DashboardPage from './pages/DashboardPage';
// import DashboardPage from './pages/Dashboardpage';
// import ProtectedRoute from './features/auth/ProtectedRoute';
// import './index.css';  // <- add this line
// import ProductsPage from './pages/ProductPage';

// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/products" element={<ProductsPage />} />

//       <Route path="/" element={
//         <ProtectedRoute>
//           <DashboardPage />
//         </ProtectedRoute>
//       } />
//     </Routes>
//   </BrowserRouter>
// );

// export default App;
