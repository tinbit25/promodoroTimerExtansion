import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; // Add the faEllipsisV icon

const Header = ({
  isDarkMode,
  toggleTheme,
  isLoggedIn,
  onLogout,
  userProfile,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); 
        
        navigate("/login");
        onLogout(); 
      } else {
        console.error(data.message); 
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const handleProfileMenuItemClick = (item) => {
    setShowProfileMenu(false); 

    if (item === "Logout") {
      handleLogout();
    
    } else if (item === "Status") {
      navigate("/status"); 
    }
  };

  return (
    <header className="-my-6 z-10 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">
        <Link className="flex" to="/">
          <img className="rounded-full" src={logo} alt="Pomodoro Timer Logo" />
        </Link>
      </h1>
      <div className="flex items-center space-x-4">
        <button
          className={`px-3 py-1 bg-transparent text-2xl ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <FontAwesomeIcon icon={faMoon} style={{ color: 'rgb(102, 231, 231)' }} />
          ) : (
            <FontAwesomeIcon icon={faSun} style={{ color: 'rgb(102, 231, 231)' }} />
          )}
        </button>
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-10 h-10 flex justify-center items-center "
              aria-label="Open Profile Menu"
            >
              <FontAwesomeIcon icon={faEllipsisV} style={{ color: isDarkMode ? '#fff' : '#333' }} />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg py-2 w-48">
                {["Status", "Logout"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleProfileMenuItemClick(item)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-3 py-1 bg-transparent border text-light-cyan  text-white rounded"
            onClick={() => navigate("/login")} 
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
