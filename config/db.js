const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  let mongo_URI = "mongodb+srv://mindula20200697:tJ7jq277Doq69N3I@cluster0.zf7jptt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
