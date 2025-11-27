import { useAuthStore } from "./store/userAuthStore.js";
import { useEffect } from "react";
import { Button } from "./components/Button";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoaderAnimate from "./components/LoaderAnimate.jsx";

import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Settings from "./pages/Settings.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

function App() {
  // const checkAuth = useAuthStore((s) => s.checkAuth);
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // if(true){
  if (isCheckingAuth && !authUser) {
    return <LoaderAnimate />;
  }

  return (
    <Routes>
      <div>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LogInPage /> : <Navigate to={"/"} />}
          />
        </Routes>
        <Route path="/aboutus" element={!authUser && <AboutUs />} />
        <Toaster />
      </div>
    </Routes>
  );
}

export default App;
