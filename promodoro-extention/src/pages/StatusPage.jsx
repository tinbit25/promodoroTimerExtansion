import React, { useEffect, useState } from "react";

const StatusPage = ({ isDarkMode }) => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (sessions.length === 0) {
    return <div className="p-8">No session history available.</div>;
  }

  // Group and aggregate totals by purpose
  const aggregatedTotals = sessions.reduce((acc, session) => {
    const purpose = session.tab || "General"; // Use "General" if the purpose is missing
    if (!acc[purpose]) {
      acc[purpose] = {
        focusTime: 0,
        shortBreak: 0,
        longBreak: 0,
      };
    }
    acc[purpose].focusTime += session.focusTime || 0;
    acc[purpose].shortBreak += session.shortBreak || 0;
    acc[purpose].longBreak += session.longBreak || 0;
    return acc;
  }, {});

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 60) {
      return `${timeInSeconds} seconds`;
    } else {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes} minutes${seconds > 0 ? ` and ${seconds} seconds` : ""}`;
    }
  };

  return (
    <div className={`p-8 ${isDarkMode ? " text-white" : "text-black"}`}>
      <h2 className="text-2xl font-bold mb-4">Session Statistics by Category</h2>
      <div className="space-y-4">
        {Object.keys(aggregatedTotals).map((purpose) => (
          <div
            key={purpose}
            className={`p-4 rounded shadow ${isDarkMode ? "bg-gray-900 bg-opacity-30" : "bg-gray-100 bg-opacity-20"}`}
          >
            <h3 className="text-lg font-bold mb-2">{purpose}</h3>
            <p>Focus Time: {formatTime(aggregatedTotals[purpose].focusTime)}</p>
            <p>Short Break: {formatTime(aggregatedTotals[purpose].shortBreak)}</p>
            <p>Long Break: {formatTime(aggregatedTotals[purpose].longBreak)}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default StatusPage;