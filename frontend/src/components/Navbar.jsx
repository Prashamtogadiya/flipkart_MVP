import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import CategoryNavbar from "./CategoryNavbar";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const userName = user?.username;

  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#2874f0] text-white px-2 md:px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex flex-col hover:opacity-90 transition-opacity"
        >
          <span className="text-lg md:text-xl font-bold whitespace-nowrap">
            Flipkart
          </span>
          <span className="text-xs flex items-center">
            Explore
            <span className="text-yellow-300 ml-1 flex items-center">
              Plus
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                alt="plus"
                className="h-3 w-3 ml-0.5"
              />
            </span>
          </span>
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <IoMdMenu className="text-2xl" />
        </button>

        {/* Search Bar (hidden on small screens, shown on md+) */}
        <div className="hidden md:block flex-1 mx-2 md:mx-8 max-w-xs md:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="font-semibold flex items-center gap-1 px-2 py-1 hover:text-gray-200 transition-colors">
                <FaUserCircle className="text-lg" />
                <span>{userName}</span>
                <span className="group-hover:hidden block">
                  <IoMdArrowDropdown />
                </span>
                <span className="group-hover:block hidden">
                  <IoMdArrowDropup />
                </span>
              </button>
              <div className="absolute hidden group-hover:block top-full right-0 mt-0 bg-white text-gray-800 shadow-xl rounded-sm w-48 z-10 border border-gray-100">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
                >
                  Wishlist
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors border-t border-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-semibold hover:text-gray-200 transition-colors px-2 py-1"
            >
              Login
            </Link>
          )}

          <Link
            to="/seller"
            className="font-semibold hover:text-gray-200 transition-colors px-2 py-1 whitespace-nowrap"
          >
            Become a Seller
          </Link>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="font-semibold flex items-center gap-1 px-2 py-1 hover:text-gray-200 transition-colors">
              More
              <span className="group-hover:hidden block">
                <IoMdArrowDropdown />
              </span>
              <span className="group-hover:block hidden">
                <IoMdArrowDropup />
              </span>
            </button>
            <div className="absolute hidden group-hover:block top-full right-0 mt-0 bg-white text-gray-800 shadow-xl rounded-sm w-48 z-10 border border-gray-100">
              <Link
                to="/notifications"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
              >
                Notification Preferences
              </Link>
              <Link
                to="/customer-care"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
              >
                24x7 Customer Care
              </Link>
              <Link
                to="/advertise"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
              >
                Advertise
              </Link>
              <Link
                to="/download-app"
                className="block px-4 py-2 hover:bg-blue-50 hover:text-[#2874f0] transition-colors"
              >
                Download App
              </Link>
            </div>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="font-semibold flex items-center gap-2 px-2 py-1 hover:text-gray-200 transition-colors relative"
          >
            <FaShoppingCart className="text-lg" />
            <span>Cart</span>
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="block md:hidden px-2 py-2 bg-[#2874f0]">
        <SearchBar />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-lg z-50 flex flex-col pt-8 px-4">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <FaUserCircle className="text-xl text-[#2874f0]" />
                <span className="font-semibold">{userName}</span>
              </div>
              <Link
                to="/profile"
                className="block py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="block py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="block py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block py-2 border-b text-left w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block py-2 border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
          <Link
            to="/seller"
            className="block py-2 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            Become a Seller
          </Link>
          <Link
            to="/cart"
            className="block py-2 border-b flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaShoppingCart className="text-lg" />
            Cart
            <span className="ml-auto bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link
            to="/notifications"
            className="block py-2 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            Notification Preferences
          </Link>
          <Link
            to="/customer-care"
            className="block py-2 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            24x7 Customer Care
          </Link>
          <Link
            to="/advertise"
            className="block py-2 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            Advertise
          </Link>
          <Link
            to="/download-app"
            className="block py-2 border-b"
            onClick={() => setMobileMenuOpen(false)}
          >
            Download App
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
