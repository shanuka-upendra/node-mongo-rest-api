const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

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

async function createUser({ name, email, age, password }) {
    if (!name || !email || !password) {
        const err = new Error('Name, email, and password are required');
        err.statusCode = 400;
        throw err;
    }

    if (password.length < 6) {
        const err = new Error('Password must be at least 6 characters long');
        err.statusCode = 400;
        throw err;
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        const err = new Error('Email already exists');
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        name,
        email: email.toLowerCase(),
        age: age || null,
        password: hashedPassword,
        createdAt: new Date(),
    };

    const userId = await userRepository.insertOne(userData);
    return { id: userId, ...userData };
}

async function loginUser({ email, password }) {
    if (!email || !password) {
        const err = new Error('Email and password are required');
        err.statusCode = 400;
        throw err;
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
        const err = new Error('Invalid email or password');
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error('Invalid email or password');
        err.statusCode = 401;
        throw err;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function updateUser(id, updates) {
    await getUserById(id); // Ensure user exists

    const { _id, createdAt, password: _, ...updateData } = updates; // Prevent updating _id and createdAt

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

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
