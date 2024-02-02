const mongoose = require("mongoose");

//   await mongoose.connect('mongodb://127.0.0.1:27017/coffee');

const connectDatabase = async () => {
  const db = "mongodb+srv://zehan:zehan@cluster0.ym2cu71.mongodb.net/";
  const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
  };

  try {
    await mongoose.connect(db, options);
    console.log(`connected to database ✅`);
  } catch (e) {
    console.log(`Error connecting to mongoose due to ${e.message} ❌`);
  }
};

module.exports = connectDatabase;
