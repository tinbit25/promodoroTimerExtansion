import React, { useEffect, useState } from "react";
import { TailSpin } from 'react-loader-spinner';

const StatusPage = ({ isDarkMode }) => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ focusTime: 0, shortBreak: 0, longBreak: 0, completedSessions: 0, purpose: {} });

  useEffect(() => {
    const fetchSessions = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User ID is not available. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/sessions/history?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch sessions: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setSessions(data.sessions);
          setTotals(data.totals); // Set aggregated totals
        } else {
          throw new Error(data.message || "Failed to fetch session history");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className={`p-8 ${isDarkMode ? "text-white" : "text-black"} flex justify-center items-center h-screen`}>
        <TailSpin height={80} width={80} color={isDarkMode ? "#ffffff" : "#000000"} ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className={`p-8 ${isDarkMode ? "text-white" : "text-black"}`}>
      {error && <div className="p-4 text-red-500">{error}</div>}

      {sessions.length === 0 && !error && <div className="p-8">No session history available.</div>}

      {sessions.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">User Statistics</h2>
          <div className={`p-4 rounded shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <h3 className="text-lg font-bold mb-2">Total Focus Time: {formatTime(totals.focusTime)}</h3>
            <h3 className="text-lg font-bold mb-2">Total Short Break: {formatTime(totals.shortBreak)}</h3>
            <h3 className="text-lg font-bold mb-2">Total Long Break: {formatTime(totals.longBreak)}</h3>
            <h3 className="text-lg font-bold mb-2">Completed Sessions: {totals.completedSessions}</h3>
          </div>

          <h2 className="text-2xl font-bold mb-4">Session Breakdown by Purpose</h2>
          <div className="space-y-4">
            {Object.keys(totals.purpose).map((purpose) => (
              <div key={purpose} className={`p-4 rounded shadow ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <h3 className="text-lg font-bold mb-2">{purpose}</h3>
                <p>Sessions Completed: {totals.purpose[purpose]}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const formatTime = (timeInSeconds) => {
  if (timeInSeconds < 60) {
    return `${timeInSeconds} seconds`;
  } else {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes${seconds > 0 ? ` and ${seconds} seconds` : ""}`;
  }
};

export default StatusPage;