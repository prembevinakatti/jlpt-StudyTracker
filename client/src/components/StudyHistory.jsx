import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const StudyHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get("http://localhost:3000/api/logs/getLogs", {
        withCredentials: true,
      });
      setLogs(res.data.logs);
    };
    fetchLogs();
  }, []);

  // Helper function to convert totalMinutes to "Xh Ym" format
  const formatTime = (totalMinutes) => {
    if (!totalMinutes) return "0m";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
      ? minutes > 0
        ? `${hours}h ${minutes}m`
        : `${hours}h`
      : `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 p-8">
      <Navbar />
      <h1 className="text-4xl font-bold text-purple-700 mt-10 mb-6">Study History</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-xl">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-4 rounded-l-2xl">Date</th>
              <th className="p-4">Category</th>
              <th className="p-4">Time Spent</th>
              <th className="p-4 rounded-r-2xl">Notes</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr
                key={log?._id}
                className="border-b border-gray-200 hover:bg-purple-50"
              >
                <td className="p-4">
                  {new Date(log.date).toLocaleDateString()}
                </td>
                <td className="p-4">{log?.category}</td>
                <td className="p-4">{formatTime(log?.totalMinutes)}</td>
                <td className="p-4">{log?.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyHistory;
