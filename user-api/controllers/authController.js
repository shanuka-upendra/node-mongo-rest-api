const userService = require('../services/userService');

async function register(req, res, next) {
    try {
        const users = await userService.createUser(req.body);

        const { password, ...safeUser } = users;
        res.status(201).json({ success: true, data: safeUser });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const user = await userService.loginUser(req.body);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login };