const mongoose = require("mongoose");
const config = require("./configuration");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB error: ${err}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed (app termination)");
  process.exit(0);
});

module.exports = connectDB;
