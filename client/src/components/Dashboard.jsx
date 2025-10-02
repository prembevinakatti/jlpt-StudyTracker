import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Navbar from "./Navbar";

const COLORS = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsRes = await axios.get(
          "https://jlpt-studytracker.onrender.com/api/logs/getLogs",
          { withCredentials: true }
        );
        setLogs(logsRes.data.logs);

        const statsRes = await axios.get(
          "https://jlpt-studytracker.onrender.com/api/logs/stats",
          { withCredentials: true }
        );
        setStats(statsRes.data.stats);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  // Convert total minutes to hours and minutes
  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    return `${minutes}m`;
  };

  // Total minutes across all logs
  const totalMinutes = logs.reduce((sum, log) => sum + Number(log.totalMinutes || 0), 0);

  // Daily chart data (keep minutes for LineChart)
  const dailyData = logs
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString(),
      minutes: Number(log.totalMinutes || 0),
    }));

  // Category-wise data
  const categoryData = stats?.map((stat) => ({
    name: stat.category,
    value: Number(stat.totalMinutes || 0),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 p-8">
      <Navbar />
      <h1 className="text-4xl font-bold text-purple-700 mt-10 mb-6">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-purple-600">Total Time</h2>
          <p className="text-3xl font-bold mt-2">{formatTime(totalMinutes)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-purple-600">Study Sessions</h2>
          <p className="text-3xl font-bold mt-2">{logs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-purple-600">Categories</h2>
          <p className="text-3xl font-bold mt-2">{stats.length}</p>
        </div>
      </div>

      {/* Daily Study Time Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Daily Study Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(val) => formatTime(val)}
              allowDecimals={false}
            />
            <Tooltip formatter={(val) => formatTime(val)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#9b5de5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Time Spent per Category
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.name}: ${formatTime(entry.value)}`}
            >
              {categoryData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val) => formatTime(val)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
