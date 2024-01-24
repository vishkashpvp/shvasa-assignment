const mongoose = require("mongoose");
const config = require("../config/config");

async function connectToMongoDB() {
  return mongoose.connect(config.MONGODB_URI);
}

module.exports = { connectToMongoDB };
