// src/pages/SignInPage.jsx
import { useState } from "react";
import { EyeOff, Eye, Loader2, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/userAuthStore.js";

export default function SignInPage() {
  const { isSigningIn, signin, googleLogin } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // ----------- VALIDATION -------------
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password.trim()) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  // ----------- SUBMIT HANDLER ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signin(formData);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    googleLogin(); // this will redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-black rounded-2xl p-8 shadow-xl border border-gray-900">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Tracklit Login
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-400 mb-2">Email</label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 
                  text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-400 mb-2">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 
                text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Password Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-blue-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
              py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isSigningIn ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading} // optional, prevent double click
            className="w-full bg-white text-black font-semibold py-2 rounded-lg 
  flex items-center justify-center gap-2 hover:bg-gray-200 transition"
          >
            {isGoogleLoading ?   (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Redirecting...
              </>
            ) : (
              <>
                <FaGoogle size={18} />
                Continue with Google
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-500 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium hover:underline text-blue-400"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
