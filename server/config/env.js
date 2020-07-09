require('dotenv').config();
module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
    PORT: process.env.PORT
};