const authModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(404).json({ message: "All fields are required" });
    }
    const user = await authModel.findOne({ email });
    if (user) {
      return res
        .status(204)
        .json({ message: "User already existed in Database" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newuser = await authModel.create({
      username,
      password: hash,
      email,
    });
    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "None", // Required for cross-site requests (e.g., frontend on different domain)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });
    return res.status(200).json({
      message: "User register successfully",
      success: true,
      user: newuser,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password do not match" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "None", // Required for cross-site requests (e.g., frontend on different domain)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });
    return res
      .status(200)
      .json({ message: "User login successfully", success: true, user: user });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logout success", success: true });
  } catch (error) {
    console.log("error", error.message);
  }
};
