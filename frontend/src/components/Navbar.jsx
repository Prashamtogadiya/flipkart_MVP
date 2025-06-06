import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import CategoryNavbar from "./CategoryNavbar";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!user; // Use actual auth state from Redux
  const userName = user?.username;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#2874f0] text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex flex-col hover:opacity-90 transition-opacity"
        >
          <span className="text-xl font-bold whitespace-nowrap">Flipkart</span>
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

        {/* Search Bar */}
        <SearchBar />

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
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
    </>
  );
};

export default Navbar;
