const express = require("express");
const router = express.Router();
const {
  addStudyLog,
  getStudyLogs,
  getStats,
} = require("../controllers/study.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/createLog", isAuthenticated, addStudyLog);

router.get("/getLogs", isAuthenticated, getStudyLogs);

router.get("/stats", isAuthenticated, getStats);

module.exports = router;
