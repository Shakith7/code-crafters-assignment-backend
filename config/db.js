const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const mongo_URI = process.env.MONGODB_URI;
  console.log('Mongo URI:', mongo_URI);

  if (!mongo_URI) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongo_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;