const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @module routes/auth
 */

/**
 * Register a new user
 * @name registerUser
 * @function
 * @memberof module:routes/auth
 * @param {Object} req - Express request object
 * @param {string} req.body.username - Username
 * @param {string} req.body.password - Password (minimum 12 characters)
 * @param {Object} res - Express response object
 * @returns {Object} 200 - JWT token object
 * @returns {Object} 400 - Bad request (missing fields, weak password, or user exists)
 * @returns {Object} 500 - Server error
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const passwordRegex = /^.{12,}$/; // CNIL requirement: minimum 12 chars

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: 'Password is too weak (minimum 12 characters required).',
    });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * Authenticate user and get JWT token
 * @name loginUser
 * @function
 * @memberof module:routes/auth
 * @param {Object} req - Express request object
 * @param {string} req.body.username - Username
 * @param {string} req.body.password - Password
 * @param {Object} res - Express response object
 * @returns {Object} 200 - JWT token object
 * @returns {Object} 400 - Invalid credentials
 * @returns {Object} 500 - Server error
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
