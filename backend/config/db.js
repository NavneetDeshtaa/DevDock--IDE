const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {

    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;