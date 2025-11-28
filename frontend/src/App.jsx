import { useAuthStore } from "./store/userAuthStore.js";
import { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoaderAnimate from "./components/LoaderAnimate.jsx";

import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Settings from "./pages/Settings.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import Navbar from "./components/Navbar.jsx";

function App() {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return <LoaderAnimate />;
  }

  // Determine if we want to render full navbar or a simple one for auth pages
  const hideFullNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar visible on all pages */}
        <Navbar simple={hideFullNavbar} authUser={authUser} />

        {/* Main content */}
        <div className="min-h-screen flex flex-col pt-15">
          <Routes>
            {/* Landing page accessible to everyone */}
            <Route path="/" element={<LandingPage />} />

            {/* About Us accessible to everyone */}
            <Route path="/aboutus" element={<AboutUs />} />

            {/* Authentication pages only for unauthenticated users */}
            <Route
              path="/login"
              element={
                !authUser ? <SignInPage /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/signup"
              element={
                !authUser ? <SignUpPage /> : <Navigate to="/dashboard" />
              }
            />

            {/* Protected routes for authenticated users */}
            <Route
              path="/dashboard"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={authUser ? <Settings /> : <Navigate to="/login" />}
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default App;
  