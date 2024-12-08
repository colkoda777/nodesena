const mongoose = require('mongoose');
const authMiddleware = require('../middlewares/authMiddleware');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'user');

