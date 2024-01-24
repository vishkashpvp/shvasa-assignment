const { MONGODB_URI } = process.env;

const LOCAL = {
  MONGODB_URI: "mongodb://localhost:27017/shvasaSupport",
};

const uri = MONGODB_URI ? MONGODB_URI : LOCAL.MONGODB_URI;

const config = {
  PORT: "3000",
  MONGODB_URI: uri,
  MONGO_DB_NAME: "shvasaSupport",
};

module.exports = config;
