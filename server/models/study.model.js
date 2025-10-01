const mongoose = require("mongoose");

const StudyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  totalMinutes: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("StudyLog", StudyLogSchema);
