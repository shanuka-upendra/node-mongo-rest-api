require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/user-api',
    dbName: process.env.DB_NAME || 'user-api',
};