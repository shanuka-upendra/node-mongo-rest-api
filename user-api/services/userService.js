const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

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
  // validation
  if (!name || !email || !password) {
    const err = new Error('Name, email and password are required');
    err.statusCode = 400;
    throw err;
  }

  if (password.length < 6) {
    const err = new Error('Password must be at least 6 characters');
    err.statusCode = 400;
    throw err;
  }

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  // hash the password — 10 salt rounds is the industry standard
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email: email.toLowerCase().trim(),
    age: age || null,
    password: hashedPassword,   // ← never store plain text
    createdAt: new Date(),
  };

  const insertedId = await userRepository.insertOne(userData);
  return { _id: insertedId, ...userData };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.statusCode = 400;
    throw err;
  }

  // find user by email
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid email or password'); // vague on purpose — don't reveal which field is wrong
    err.statusCode = 401;
    throw err;
  }

  // compare plain password against stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // remove password before returning
  const { password: _, ...safeUser } = user;
  return safeUser;
}

async function updateUser(id, updates) {
  await getUserById(id);
  const { _id, createdAt, password, ...safeUpdates } = updates; // block password update here
  safeUpdates.updatedAt = new Date();
  await userRepository.updateOne(id, safeUpdates);
  return userRepository.findById(id);
}

async function deleteUser(id) {
  await getUserById(id);
  await userRepository.deleteOne(id);
}

module.exports = { getAllUsers, getUserById, createUser, loginUser, updateUser, deleteUser };