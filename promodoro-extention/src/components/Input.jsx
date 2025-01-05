import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ icon: Icon, label, type, isDarkMode, onToggleVisibility, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(type === 'password' ? false : true);

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    if (onToggleVisibility) {
      onToggleVisibility();
    }
  };

  return (
    <div className='relative mb-6'>
      {label && (
        <label htmlFor={props.name} className={`text-sm mb-2 block ${isDarkMode ? "text-gray-300" : "text-gray-900"}`}>
          {label}
        </label>
      )}
      <div className={`flex items-center border rounded-lg ${isDarkMode ? "bg-gray-800 border-gray-600" : "border-gray-300"}`}>
        {Icon && (
          <div className='flex items-center pl-3'>
            <Icon className={isDarkMode ? "w-5 h-5 text-green-200" : "w-5 h-5 text-gray-800"} />
          </div>
        )}
        <input
          {...props}
          id={props.name}
          type={isPasswordVisible ? 'text' : type}
          className={`pl-3 border-b-2 w-full py-3 pr-10 rounded-lg 
            ${isDarkMode 
              ? "bg-transparent text-white placeholder-gray-400 border-transparent focus:border-green-500 focus:ring-green-500" 
              : "bg-white bg-opacity-70 text-gray-900 placeholder-gray-600 border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center justify-center h-full"
            onClick={handleToggleVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;