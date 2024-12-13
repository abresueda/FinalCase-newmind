const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("Connected to MongoDB");
  } catch (e) {
    logger.error("MongoDB connection error", { error: e.message });
    process.exit(1);
  }
}

module.exports = { connectDB };
