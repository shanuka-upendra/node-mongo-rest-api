const { MongoClient } = require('mongodb');
const config = require('../config');

let db;

async function connectDB() {
    const client = new MongoClient(config.mongoUri);
    await client.connect();
    db = client.db(config.dbName);
    console.log(`Connected to MongoDB: ${config.dbName}`);
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB };
