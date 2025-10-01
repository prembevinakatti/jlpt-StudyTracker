import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";

const AddStudyLog = () => {
  const [form, setForm] = useState({
    category: "",
    hours: "",
    minutes: "",
    notes: "",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalMinutes =
      (Number(form.hours) || 0) * 60 + (Number(form.minutes) || 0);

    if (!form.category || totalMinutes === 0 || !form.date) {
      toast.error("Please fill category, time spent, and date", {
        duration: 3000, // auto close
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://jlpt-studytracker.onrender.com/api/logs/createLog",
        {
          category: form.category,
          notes: form.notes,
          date: form.date,
          totalMinutes,
        },
        { withCredentials: true }
      );

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const timeSpent =
        hours > 0
          ? minutes > 0
            ? `${hours}h ${minutes}m`
            : `${hours}h`
          : `${minutes}m`;

      toast.success(`Study Log Added! Time spent: ${timeSpent}`, {
        duration: 4000,
      });

      setForm({ category: "", hours: "", minutes: "", notes: "", date: "" });
    } catch (err) {
      console.log("Error : ", err);
      toast.error(err.response?.data?.message || "Error", { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 p-8 flex justify-center items-center">
      <Navbar />
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          Add Study Log
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Category</option>
            <option value="Vocabulary">Vocabulary</option>
            <option value="Listening">Listening</option>
            <option value="Reading">Reading</option>
            <option value="Grammar">Grammar</option>
            <option value="Kanji">Kanji</option>
          </select>

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Hours"
              name="hours"
              value={form.hours}
              onChange={handleChange}
              className="w-1/2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              placeholder="Minutes"
              name="minutes"
              value={form.minutes}
              onChange={handleChange}
              className="w-1/2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <textarea
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
            Add Log
          </button>
        </form>
      </div>

      {/* Toaster Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddStudyLog;
