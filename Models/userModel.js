const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avater: { type: String, required: false, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
