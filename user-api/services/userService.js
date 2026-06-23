const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
    return userRepository.findAll();
}

async function getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
    }
    return user;
}

async function createUser({ name, email, age }) {
    if(!name || !email) {
        const err = new Error('Name and email are required');
        err.statusCode = 400;
        throw err;
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        const err = new Error('Email already exists');
        err.statusCode = 409;
        throw err;
    }

    const userData = {
        name,
        email: email.toLowerCase(),
        age: age || null,
        createdAt: new Date(),
    };

    const userId = await userRepository.insertOne(userData);
    return { id: userId, ...userData };
}

async function updateUser(id, updates){
    await getUserById(id); // Ensure user exists

    const {_id, createdAt, ...updateData} = updates; // Prevent updating _id and createdAt

    if (updateData.email) {
        updateData.email = updateData.email.toLowerCase().trim();
    }

    updateData.updatedAt = new Date();
    await userRepository.updateOne(id, updateData);
    return userRepository.findById(id);
}

async function deleteUser(id) {
    await getUserById(id); // Ensure user exists
    await userRepository.deleteOne(id);
    return { message: 'User deleted successfully' };
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
