import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// SignupPage allows users to create a new account
const SignupPage = () => {
  // Local state for form fields
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Get loading and error info from Redux store
  const { loading, error, user } = useSelector((state) => state.auth);

  // If already logged in, redirect to dashboard (prevent signup)
  useEffect(() => {
    if (user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, navigate, location.pathname]);

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    // Frontend validation: username required, password required, username min 3, password min 6
    if (!form.username || !form.password) {
      setFormError("Username and password are required.");
      return;
    }
    if (form.username.length < 3) {
      setFormError("Username must be at least 3 characters.");
      return;
    }
    if (form.password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    const result = await dispatch(signup(form));
    // Only navigate if signup is fulfilled and user is present in payload
    if (
      result.meta.requestStatus === "fulfilled" &&
      result.payload &&
      result.payload.user
    ) {
      navigate("/");
    } else {
      // Prefer backend error message if available
      if (result.payload?.error) {
        setFormError(result.payload.error);
      } else if (result.payload?.errors && result.payload.errors.length > 0) {
        setFormError(result.payload.errors[0]);
      } else if (result.error?.message) {
        setFormError(result.error.message);
      } else {
        setFormError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Signup form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Signup</h2>
        {/* Username input */}
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        {/* Password input */}
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {/* Signup button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {/* Show frontend/backend validation error */}
        {formError && <p className="text-red-500 text-sm mt-3 text-center">{formError}</p>}
        {/* Show error message if signup fails (fallback) */}
        {error && !formError && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        {/* Link to login page */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
