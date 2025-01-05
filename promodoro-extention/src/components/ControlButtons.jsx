import React, { useState, useEffect } from "react";

const ControlButtons = ({
  isRunning,
  handleStartPause,
  handleRestart,
  focusTimeProgress,
  focusTimeTotal
}) => (
  <div className="flex space-x-4 justify-between">
   <button
  onClick={handleStartPause}
  className={`px-6 py-3 rounded-lg text-indigo-400 font-bold transition-all duration-300 transform hover:scale-105 
    ${isRunning ? "bg-gradient-to-r from-amber-200 to-amber-300 hover:bg-gradient-to-r hover:from-amber-300 hover:to-amber-200" : "bg-gradient-to-r from-emerald-200 to-green-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-300"}
    shadow-lg`}
>
  {isRunning ? "Pause" : "Start"}
</button>
<button
  onClick={handleRestart}
  className="px-6 py-3 rounded-lg text-indigo-400 font-bold bg-gradient-to-r from-orange-300 to-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
>
  Restart
</button>
    
    {/* Focus Time Progress */}
    {focusTimeProgress < focusTimeTotal && (
      <div className="text-xl text-white font-bold mt-2">
        Focus Time: {focusTimeProgress} / {focusTimeTotal}
      </div>
    )}
  </div>
);


export default ControlButtons;
