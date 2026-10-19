require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGO_DB_URI,
  jwtSecreet: process.env.JWT_SECRET,
};

module.exports = config;
