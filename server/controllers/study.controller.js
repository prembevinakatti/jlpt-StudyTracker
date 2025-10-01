const { default: mongoose } = require("mongoose");
const studyModel = require("../models/study.model");

const addStudyLog = async (req, res) => {
  try {
    const { category, totalMinutes, notes, date } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User Id is required" });
    }

    if (!category || !totalMinutes || !date) {
      return res
        .status(400)
        .json({ message: "Category, time, and date are required" });
    }

    const log = await studyModel.create({
      user: userId,
      category,
      totalMinutes,
      notes,
      date: date || Date.now(),
    });

    return res
      .status(201)
      .json({ message: "Study Log Created", success: true, log });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStudyLogs = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "User Id is required" });
    }

    const logs = await studyModel.find({ user: userId }).sort({ date: -1 });
    if (!logs) {
      return res.status(404).json({ message: "No Study Logs Found" });
    }

    return res.status(200).json({
      message: "Study Logs Fetched Successfully",
      success: true,
      logs,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User Id is required" });
    }

    // Aggregate study time per category
    const stats = await studyModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          totalMinutes: { $sum: { $toInt: "$totalMinutes" } }, // convert string to number
        },
      },
    ]);

    // Format hours and minutes
    const formattedStats = stats.map((stat) => {
      const hours = Math.floor(stat.totalMinutes / 60);
      const minutes = stat.totalMinutes % 60;
      return {
        category: stat._id,
        totalMinutes: stat.totalMinutes,
        formatted: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      };
    });

    return res.status(200).json({
      message: "Stats Fetched Successfully",
      success: true,
      stats: formattedStats,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addStudyLog,
  getStudyLogs,
  getStats,
};
