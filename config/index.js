const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {

    jwtSecretKey: process.env.jwtSecret,
    db_url: process.env.DB_URL,
    usr: process.env.USR,
    pass: process.env.PASS
}