import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// LoginPage allows users to log in to their account
const LoginPage = () => {
  // Local state for form fields
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get loading, error, and user info from Redux store
  const { loading, error, user } = useSelector((state) => state.auth);

  // Handle form submission for login
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
    const result = await dispatch(login(form));
    // Show backend error details if present
    if (
      result.meta.requestStatus !== "fulfilled" ||
      !result.payload ||
      !result.payload.user
    ) {
      // Prefer backend error message if available
      if (result.payload?.error) {
        setFormError(result.payload.error);
      } else if (result.payload?.errors && result.payload.errors.length > 0) {
        setFormError(result.payload.errors[0]);
      } else {
        setFormError("Login failed. Please check your credentials.");
      }
      return;
    }
    navigate("/");
  };

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Login form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        {/* Username input */}
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        {/* Password input */}
        <input
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {/* Show frontend/backend validation error */}
        {formError && <p className="text-red-500 text-sm mt-3 text-center">{formError}</p>}
        {/* Show backend error message if login fails (fallback) */}
        {error && !formError && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        {/* Link to signup page */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
