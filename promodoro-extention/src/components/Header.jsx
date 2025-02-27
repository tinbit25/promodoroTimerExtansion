import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

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
        onLogout(); 
        navigate("/login");
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
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              onChange={toggleTheme}
              checked={isDarkMode}
            />
            <div className={`block w-8 h-4 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-400' : 'bg-light-cyan'
            }`} />
            <div
              className={`dot top-0 absolute w-4 h-4 rounded-full shadow-md transition-transform duration-300 ${
                isDarkMode ? 'bg-lime-700 transform translate-x-4' : 'bg-white transform translate-x-0'
              }`}
            />
          </div>
        </label>
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-10 h-10 flex justify-center items-center"
              aria-label="Open Profile Menu"
            >
              <FontAwesomeIcon icon={faEllipsisV} style={{ color: isDarkMode ? '#fff' : '#333' }} />
            </button>

            {/* Dropdown Menu */}
           {showProfileMenu && (
  <div className={`absolute right-0 mt-2 rounded-lg shadow-lg py-2 w-48 
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-green-200 to-blue-200 text-black '}`}>
    {["Status", "Logout"].map((item) => (
      <button
        key={item}
        onClick={() => handleProfileMenuItemClick(item)}
        className={`block w-full text-left px-4 py-2 
          ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gradient-to-r hover:from-green-200 hover:to-emerald-100'} 
          transition-colors`}
      >
        {item}
      </button>
    ))}
  </div>
)}
</div>
        ) : (
          <button
            className="px-3 py-1 bg-gradient-to-r from-emerald-200 to-light-cyan hover:bg-gradient-to-r hover:from-green-300 hover:to-emerald-300 border text-indigo-400 rounded-tr-lg rounded-bl-lg shadow-lg"
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