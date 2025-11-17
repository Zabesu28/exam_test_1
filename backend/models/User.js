const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} username - Unique username
 * @property {string} password - Hashed password
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
