require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/user-api',
    dbName: process.env.DB_NAME || 'user-api',
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};