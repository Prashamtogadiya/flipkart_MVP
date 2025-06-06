import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductPage";
import "./index.css";
import HeroSection from "./pages/HeroSection";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";

// DashboardPage (with Navbar) is always rendered, but only Cart/Orders are protected
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Always show DashboardPage (with Navbar), HeroSection, Products, ProductDetail */}
      <Route path="/" element={<DashboardPage />}>
        <Route index element={<HeroSection />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetail />} />

        {/* Protected routes */}
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />
        {/* Add more nested routes here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
