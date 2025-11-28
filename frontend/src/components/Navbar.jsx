
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore.js";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };


  return (
    <nav className="bg-black text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              Tracklit
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {!authUser ? (
              <>
                <Link to="/aboutus" className="hover:text-blue-400 transition">
                  About
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
                <Link to="/profile" className="hover:text-blue-400 transition">
                  Profile
                </Link>
                <Link to="/settings" className="hover:text-blue-400 transition">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pt-2 pb-4 space-y-2">
          {!authUser ? (
            <>
              <Link
                to="/aboutus"
                className="block py-2 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-4 border border-blue-600 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block py-2 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="block py-2 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block py-2 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition w-full text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
