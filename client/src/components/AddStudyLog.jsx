import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const AddStudyLog = () => {
  const [form, setForm] = useState({
    category: "",
    hours: "",
    minutes: "",
    notes: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalMinutes =
      (Number(form.hours) || 0) * 60 + (Number(form.minutes) || 0);

    if (!form.category || totalMinutes === 0 || !form.date) {
      setMessage("Please fill category, time spent, and date");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/logs/createLog",
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

      setMessage(`Study Log Added! Time spent: ${timeSpent}`);
      setForm({ category: "", hours: "", minutes: "", notes: "", date: "" });
    } catch (err) {
      console.log("Error : ", err);
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 p-8 flex justify-center items-center">
      <Navbar />
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          Add Study Log
        </h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}

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
    </div>
  );
};

export default AddStudyLog;
