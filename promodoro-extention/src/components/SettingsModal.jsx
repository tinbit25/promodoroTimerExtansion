import React, { useState } from "react";

const SettingsModal = ({ tabsData, onSave, onClose, isDarkMode }) => {
  const [updatedTabs, setUpdatedTabs] = useState([...tabsData]);

  const handleChange = (index, field, value) => {
    const newTabs = [...updatedTabs];
    newTabs[index][field] = field === "duration" ? parseInt(value) || 0 : value;
    setUpdatedTabs(newTabs);
  };

  const handleSave = () => {
    onSave(updatedTabs);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg transition-transform transform ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-xl"
            : "bg-gradient-to-r from-green-100 to-yellow-50 text-black shadow-lg"
        } w-80`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
        {updatedTabs.map((tab, index) => (
          <div key={tab.value} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {tab.label} Duration (seconds)
            </label>
            <input
              type="number"
              value={tab.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
              className={`w-full mt-1 p-2 border rounded-full transition duration-200 ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              isDarkMode
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:bg-gradient-to-l"
                : "bg-gradient-to-r from-blue-300 to-blue-400 text-white hover:bg-gradient-to-l"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;