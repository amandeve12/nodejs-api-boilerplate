require("dotenv").config();
const mongoose = require("mongoose");

async function connectWithDB() {
  try {
    const dbUrl = process.env.MONGOURL;

    if (!dbUrl) {
      throw new Error(process.env.MONGOURL, "MONGODB_URI not found in .env");
    }

    await mongoose.connect(dbUrl);

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", process.env.MONGODB_URI, err.message);
    process.exit(1); // Optional: Exit the process on failure
  }
}

module.exports = connectWithDB;
