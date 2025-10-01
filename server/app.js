const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authroute = require("./routes/user.route");
const studyRoute = require("./routes/study.route");
const connectDB = require("./config/database");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://expenzo-q1hu.onrender.com",
  "capacitor://localhost",
  "http://localhost",
  "https://localhost",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/api/auth", authroute);
app.use("/api/logs", studyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
