const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb:localhost:5500', {
      dbName:"blog"
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
