const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB database
const connectMongoDB = async () => {
  try {
    // Connect to MongoDB using the URL in the .env file
    await mongoose.connect(process.env.MONGO_URI);

    // If connected successfully, print this message
    console.log("MongoDB Connected");
  } catch (error) {
    // If connection fails, print error message
    console.error("MongoDB Connection Failed", error.message);

    // Stop the app if database connection fails
    process.exit(1);
  }
};

// Export the connectDB function to use in other files
module.exports = connectMongoDB;
