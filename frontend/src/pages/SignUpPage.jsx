  // src/pages/SignUpPage.jsx
  import { useState } from "react";
  import { EyeOff, Eye, Loader2, Mail } from "lucide-react";
  import toast from "react-hot-toast";
  import { Link } from "react-router-dom";

  import { useAuthStore } from "../store/userAuthStore.js";

  export default function SignUpPage() {
    const { isSigningUp, signup } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });

    // ----------- VALIDATION -------------
    const validateForm = () => {
      if (!formData.fullName.trim()) return toast.error("Full name is required");
      if (!formData.username.trim()) return toast.error("Username is required");
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
      if (validateForm()) signup(formData);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md bg-black rounded-2xl p-8 shadow-xl border border-gray-900">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Tracklit Sign Up
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Enter a username"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

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
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-400 hover:text-blue-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-gray-500 text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline text-blue-400"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    );
  }
