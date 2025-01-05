import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ icon: Icon, label, type, onToggleVisibility, ...props }) => {
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
        <label htmlFor={props.name} className="text-gray-300 text-sm mb-2 block">
          {label}
        </label>
      )}
      <div className='flex items-center border border-gray-600 bg-gray-800 rounded-lg'>
        {Icon && (
          <div className='flex items-center pl-3'>
            <Icon className="w-5 h-5 text-green-200" />
          </div>
        )}
        <input
          {...props}
          id={props.name}
          type={isPasswordVisible ? 'text' : type}
          className='w-full py-3 pl-0 pr-10 bg-transparent rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500'
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