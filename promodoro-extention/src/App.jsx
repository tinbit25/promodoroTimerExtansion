import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Status from "./pages/StatusPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const toggleTheme = () => setIsDarkMode((prev) => !prev);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); 
    }

    const storedUserId = localStorage.getItem("userId"); 
    console.log("User  ID from local storage:", storedUserId); 
    setUserId(storedUserId); 
  }, []);

  // Handle login success and redirect
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem("userId", userData._id); 
    setUserId(userData._id); 
    navigate("/");
  };

  // Handle signup success and redirect
  const handleSignupSuccess = () => {
    navigate("/login"); 
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId");
    setUserId(null); 
    navigate("/login"); 
  };

  // Handle session complete (update session data)
  const handleSessionComplete = (sessionDetails) => {
    setSessionData(sessionDetails);
    console.log("Session Completed: ", sessionDetails);
  };

  return (
    <div
    className={`m-2 overflow-hidden border border-light-cyan w-96 h-full flex flex-col rounded-xl transition-colors duration-300 ${
      isDarkMode
        
        ? "bg-gray-800 text-gray-200 border-gray-600"
        : "bg-gradient-to-br from-green-200 to-blue-100 animate-gradient text-gray-900"
    }`}
  >
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isDarkMode={isDarkMode}
                handleSessionComplete={handleSessionComplete}
                userId={userId} 
              />
            }
          />
         <Route
  path="/signup"
  element={<Signup onSignupSuccess={handleSignupSuccess} isDarkMode={isDarkMode} />}
/>
<Route
  path="/login"
  element={<Login onLoginSuccess={handleLoginSuccess} isDarkMode={isDarkMode} />}
/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/status" element={<Status sessionData={sessionData} isDarkMode={isDarkMode}  />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;