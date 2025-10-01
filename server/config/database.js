const mongoose = require("mongoose");
const connectDB = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connection successful");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  } catch (error) {
    console.log("Error", error.message);
  }
};
module.exports = connectDB;
