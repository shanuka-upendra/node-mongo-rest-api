const { getDB } = require('../db/connection');
const { ObjectId } = require('mongodb');

function getUserCollection() {
    return getDB().collection('users');
}

async function findAll({ filter = {}, skip = 0, limit = 10 } = {}) {
    return getUserCollection().find(filter).skip(skip).limit(limit).toArray();
}

async function countDocuments(filter = {}) {
    return getUserCollection().countDocuments(filter);
}

async function findById(id) {
    return getUserCollection().findOne({ _id: new ObjectId(id) });
}

async function findByEmail(email) {
    return getUserCollection().findOne({ email });
}

async function insertOne(userData) {
    const result = await getUserCollection().insertOne(userData);
    return result.insertedId;
}

async function updateOne(id, updateData) {
    const result = await getUserCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
    return result.modifiedCount;
}

async function deleteOne(id) {
    const result = await getUserCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

module.exports = { findAll, findById, findByEmail, insertOne, updateOne, deleteOne, countDocuments };
