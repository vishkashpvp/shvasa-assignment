const { ALLOWED_ORIGINS, MONGODB_URI } = process.env;

const LOCAL = {
  ORIGINS: "http://localhost:4200,http://localhost:5173",
  MONGODB_URI: "mongodb://localhost:27017/shvasaSupport",
};

const origins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS : LOCAL.ORIGINS;
const uri = MONGODB_URI ? MONGODB_URI : LOCAL.MONGODB_URI;

const config = {
  PORT: "3000",
  MONGODB_URI: uri,
  MONGO_DB_NAME: "shvasaSupport",
  ALLOWED_ORIGINS: origins.split(","),
};

module.exports = config;
