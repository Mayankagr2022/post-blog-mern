const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mynkagrwl1995:NewMayank%40123@cluster1.xo9ze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
      dbName:"blog"
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
