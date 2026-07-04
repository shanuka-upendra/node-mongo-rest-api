const userService = require('../services/userService');

async function getAllUsers(req, res, next) {
  try {
    // parse query params — convert to correct types
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    // guard against abuse
    const safePage = page < 1 ? 1 : page;
    const safeLimit = limit > 100 ? 100 : limit; // max 100 per page

    const result = await userService.getAllUsers({
      page: safePage,
      limit: safeLimit,
      search,
    });

    res.json({
      success: true,
      count: result.users.length,
      pagination: result.pagination,
      data: result.users,
    });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({ ...req.body, password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };